using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    /// <summary>
    /// Provides APIs to work with user account.
    /// </summary>
    public interface IAccountService
    {
        /// <summary>
        /// Authenticates user based on properties from <see cref="LoginDto"/>
        /// </summary>
        /// <returns><see cref="JwtDto"/> with JSON Web Token</returns>
        Task<JwtDto> Login(LoginDto model);

        /// <summary>
        /// Creates new account and authenticates user based on properties from <see cref="RegisterDto"/>
        /// </summary>
        /// <returns><see cref="JwtDto"/> with JSON Web Token</returns>
        /// 
        Task<JwtDto> Register(RegisterDto model);


        /// <summary>
        /// Updates account information.
        /// </summary>
        /// <param name="account">Account information model</param>
        Task UpdateAccountInfoAsync(AccountDto account);
    }
}
