using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Database.Entities;

namespace Diet.Core.Services.Interfaces
{
    public interface IJwtService
    {
        Task<JwtDto> GenerateJwtAsync(ApplicationUserEntity user);
    }
}
