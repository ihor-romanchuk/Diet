using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Diet.Core.Dtos;
using Diet.Core.ErrorHandling.Exceptions;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Services
{
    /// <inheritdoc />
    public class UsersService : IUsersService
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUserEntity> _userManager;

        public UsersService(IMapper mapper, UserManager<ApplicationUserEntity> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        /// <inheritdoc />
        public async Task<List<UserDto>> GetAsync()
        {
            List<UserDto> result = await _userManager.Users.OrderBy(u => u.UserName).ProjectTo<UserDto>(_mapper.ConfigurationProvider).ToListAsync();

            foreach (UserDto userDto in result)
            {
                userDto.Roles = await _userManager.GetRolesAsync(new ApplicationUserEntity { Id = userDto.Id });
            }

            return result;
        }

        /// <inheritdoc />
        public async Task<UserDto> GetByIdAsync(string id)
        {
            UserDto user = await _userManager.Users.Where(u => u.Id == id)
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();
            if(user == null)
                throw new NotFoundException();

            user.Roles = await _userManager.GetRolesAsync(new ApplicationUserEntity { Id = user.Id });

            return user;
        }

        /// <inheritdoc />
        public async Task CreateAsync(UserDto userDto)
        {
            var user = new ApplicationUserEntity
            {
                UserName = userDto.Email,
                Email = userDto.Email
            };
            IdentityResult result = await _userManager.CreateAsync(user, userDto.Password);

            if (result.Succeeded)
            {
                result = await _userManager.AddToRolesAsync(user, userDto.Roles);
                if (result.Succeeded)
                {
                    return;
                }
            }

            throw new ValidationException(result.Errors);
        }

        /// <inheritdoc />
        public async Task UpdateAsync(UserDto userDto)
        {
            ApplicationUserEntity userEntity = await _userManager.FindByIdAsync(userDto.Id);
            if (userEntity == null)
                throw new NotFoundException();

            IdentityResult result;
            if (!string.IsNullOrEmpty(userDto.Password))
            {
                string token = await _userManager.GeneratePasswordResetTokenAsync(userEntity);
                result = await _userManager.ResetPasswordAsync(userEntity, token, userDto.Password);
                if (!result.Succeeded)
                {
                    throw new ValidationException("password", result.Errors);
                }
            }

            userEntity.UserName = userDto.Email;
            userEntity.Email = userDto.Email;
            result = await _userManager.UpdateAsync(userEntity);
            if (!result.Succeeded)
            {
                throw new ValidationException("email", result.Errors);
            }

            IList<string> existingRoles = await _userManager.GetRolesAsync(userEntity);
            List<string> rolesToAdd = userDto.Roles.Where(r => !existingRoles.Contains(r)).ToList();
            List<string> rolesToRemove = existingRoles.Where(r => !userDto.Roles.Contains(r)).ToList();
            result = await _userManager.RemoveFromRolesAsync(userEntity, rolesToRemove);
            if (!result.Succeeded)
            {
                throw new ValidationException("roles", result.Errors);
            }
            result = await _userManager.AddToRolesAsync(userEntity, rolesToAdd);
            if (!result.Succeeded)
            {
                throw new ValidationException("roles", result.Errors);
            }
        }

        /// <inheritdoc />
        public async Task DeleteAsync(string id)
        {
            ApplicationUserEntity userEntity = await _userManager.FindByIdAsync(id);
            if(userEntity == null)
                throw new NotFoundException();

            await _userManager.DeleteAsync(userEntity);
        }
    }
}
