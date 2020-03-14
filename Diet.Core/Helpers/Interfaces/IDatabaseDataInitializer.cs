using System.Threading.Tasks;

namespace Diet.Core.Helpers.Interfaces
{
    /// <summary>
    /// Provides APIs for database initialization.
    /// </summary>
    public interface IDatabaseDataInitializer
    {
        /// <summary>
        /// Populates database with user roles <see cref="RolesConstants"/>.
        /// </summary>
        Task SeedRolesAsync();
    }
}
