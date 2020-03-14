using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Database.Entities;

namespace Diet.Core.Services.Interfaces
{
    /// <summary>
    /// Provides APIs to work with JSON Web Token.
    /// </summary>
    public interface IJwtService
    {
        /// <summary>
        /// Generates JSON Web Token for user.
        /// </summary>
        /// <param name="user">User antity</param>
        /// <returns><see cref="JwtDto"/> with JSON Web Token</returns>
        Task<JwtDto> GenerateJwtAsync(ApplicationUserEntity user);
    }
}
