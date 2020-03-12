using System.Linq;
using System.Threading.Tasks;
using Diet.Database.Entities;
using Diet.Database.Enums;

namespace Diet.Core.Repositories.Interfaces
{
    public interface ISettingsRepository
    {
        IQueryable<SettingEntity> Get();

        Task<SettingEntity> GetByTypeAsync(SettingType type);

        Task CreateAsync(SettingEntity setting);

        Task UpdateAsync(SettingEntity setting);

        Task DeleteAsync(SettingEntity setting);
    }
}
