using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Diet.Core.Configuration;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Diet.Core.Services
{
    /// <inheritdoc />
    public class JwtService : IJwtService
    {
        private readonly UserManager<ApplicationUserEntity> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IOptions<JwtSettings> _jwtSettings;

        public JwtService(UserManager<ApplicationUserEntity> userManager,
            RoleManager<IdentityRole> roleManager, IOptions<JwtSettings> jwtSettings)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtSettings = jwtSettings;
        }

        /// <inheritdoc />
        public async Task<JwtDto> GenerateJwtAsync(ApplicationUserEntity user)
        {
            List<Claim> claims = await GetClaimsAsync(user);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Value.Key));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expirationDate = DateTime.Now.AddSeconds(_jwtSettings.Value.ExpireSeconds);

            var token = new JwtSecurityToken(
                _jwtSettings.Value.Issuer,
                _jwtSettings.Value.Issuer,
                claims,
                expires: expirationDate,
                signingCredentials: signingCredentials
            );

            return new JwtDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

        private async Task<List<Claim>> GetClaimsAsync(ApplicationUserEntity user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            IList<Claim> userClaims = await _userManager.GetClaimsAsync(user);
            IList<string> userRoles = await _userManager.GetRolesAsync(user);
            claims.AddRange(userClaims);

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));

                IdentityRole role = await _roleManager.FindByNameAsync(userRole);
                if (role != null)
                {
                    IList<Claim> roleClaims = await _roleManager.GetClaimsAsync(role);
                    claims.AddRange(roleClaims);
                }
            }

            return claims;
        }
    }
}
