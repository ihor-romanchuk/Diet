using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Database.Enums;

namespace Diet.Core.Services.Interfaces
{
    public interface ISettingsService
    {
        Task<List<SettingDto>> GetAsync();

        Task<SettingDto> GetByTypeAsync(SettingType type);

        Task CreateAsync(SettingDto settingDto);

        Task UpdateAsync(SettingDto settingDto);

        Task DeleteAsync(SettingType type);
    }
}
