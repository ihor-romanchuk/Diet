using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    public interface IAccountService
    {
        Task<JwtDto> Login(LoginDto model);
        Task<JwtDto> Register(RegisterDto model);
        Task UpdateAccountInfoAsync(AccountDto account);
    }
}
