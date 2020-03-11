using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    public interface IUsersService
    {
        Task<List<UserDto>> GetAsync();

        Task<UserDto> GetByIdAsync(string id);

        Task CreateAsync(UserDto userDto);

        Task UpdateAsync(UserDto userDto);

        Task DeleteAsync(string id);
    }
}
