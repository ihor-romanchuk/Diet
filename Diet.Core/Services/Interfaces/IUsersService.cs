using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    /// <summary>
    /// Provides APIs to work with user entities.
    /// </summary>
    public interface IUsersService
    {
        /// <summary>
        /// Gets list of users
        /// </summary>
        /// <returns></returns>
        Task<List<UserDto>> GetAsync();

        /// <summary>
        /// Gets user by id
        /// </summary>
        Task<UserDto> GetByIdAsync(string id);

        /// <summary>
        /// Creates new user
        /// </summary>
        Task CreateAsync(UserDto userDto);

        /// <summary>
        /// Updates existing user.
        /// </summary>
        Task UpdateAsync(UserDto userDto);

        /// <summary>
        /// Deletes user with id
        /// </summary>
        Task DeleteAsync(string id);
    }
}
