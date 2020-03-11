using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    public interface ISettingsService
    {
        Task<List<SettingDto>> GetAsync();

        Task<SettingDto> GetByIdAsync(int id);

        Task CreateAsync(SettingDto settingDto);

        Task UpdateAsync(SettingDto settingDto);

        Task DeleteAsync(int id);
    }
}
