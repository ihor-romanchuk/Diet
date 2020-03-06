using System.Threading.Tasks;

namespace Diet.Core.Helpers.Interfaces
{
    public interface IDatabaseDataInitializer
    {
        Task SeedRolesAsync();
    }
}
