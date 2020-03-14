using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.ErrorHandling.Exceptions;
using Diet.Core.Helpers.Interfaces;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Microsoft.AspNetCore.Identity;

namespace Diet.Core.Services
{
    /// <inheritdoc />
    public class AccountService : IAccountService
    {
        private readonly UserManager<ApplicationUserEntity> _userManager;
        private readonly IUserHelper _userHelper;
        private readonly IJwtService _jwtService;

        public AccountService(UserManager<ApplicationUserEntity> userManager, IUserHelper userHelper, IJwtService jwtService)
        {
            _userManager = userManager;
            _userHelper = userHelper;
            _jwtService = jwtService;
        }

        /// <inheritdoc />
        public async Task<JwtDto> Login(LoginDto model)
        {
            ApplicationUserEntity user = await _userManager.FindByNameAsync(model.Email) ?? await _userManager.FindByEmailAsync(model.Email);
            if (user != null)
            {
                if (await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    return await _jwtService.GenerateJwtAsync(user);
                }
            }

            throw new ValidationException("Incorrect email and/or password.");
        }

        /// <inheritdoc />
        public async Task<JwtDto> Register(RegisterDto model)
        {
            var user = new ApplicationUserEntity
            {
                UserName = model.Email,
                Email = model.Email
            };
            IdentityResult result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                result = await _userManager.AddToRoleAsync(user, RolesConstants.User);
                if (result.Succeeded)
                {
                    return await _jwtService.GenerateJwtAsync(user);
                }
            }

            throw new ValidationException(result.Errors);
        }

        /// <inheritdoc />
        public async Task UpdateAccountInfoAsync(AccountDto account)
        {
            ApplicationUserEntity currentUserEntity = await _userManager.FindByIdAsync(_userHelper.UserId);

            IdentityResult result;
            if (!string.IsNullOrEmpty(account.Password))
            {
                string token = await _userManager.GeneratePasswordResetTokenAsync(currentUserEntity);
                result = await _userManager.ResetPasswordAsync(currentUserEntity, token, account.Password);
                if (!result.Succeeded)
                {
                    throw new ValidationException("password", result.Errors);
                }
            }

            currentUserEntity.UserName = account.Email;
            currentUserEntity.Email = account.Email;
            result = await _userManager.UpdateAsync(currentUserEntity);
            if (!result.Succeeded)
            {
                throw new ValidationException(result.Errors);
            }
        }
    }
}
