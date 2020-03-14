using System.Linq;
using System.Threading.Tasks;
using Diet.Database.Entities;
using Diet.Database.Enums;

namespace Diet.Core.Repositories.Interfaces
{
    /// <summary>
    /// Provides CRUD operations for Setting entity.
    /// </summary>
    public interface ISettingsRepository
    {
        /// <summary>
        /// Gets IQueryable of setting entities.
        /// </summary>
        IQueryable<SettingEntity> Get();

        /// <summary>
        /// Gets setting entity by <see cref="SettingType"/>.
        /// </summary>
        Task<SettingEntity> GetByTypeAsync(SettingType type);

        /// <summary>
        /// Stores new setting entity to database.
        /// </summary>
        Task CreateAsync(SettingEntity setting);

        /// <summary>
        /// Updates existing setting entity in database.
        /// </summary>
        Task UpdateAsync(SettingEntity setting);

        /// <summary>
        /// Deletes setting entity from database.
        /// </summary>
        Task DeleteAsync(SettingEntity setting);
    }
}
