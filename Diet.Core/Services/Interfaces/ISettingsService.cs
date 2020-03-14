using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Database.Enums;

namespace Diet.Core.Services.Interfaces
{
    /// <summary>
    /// Provides APIs to work user settings.
    /// </summary>
    public interface ISettingsService
    {
        /// <summary>
        /// Gets list of settings
        /// </summary>
        /// <returns>List of settings</returns>
        Task<List<SettingDto>> GetAsync();

        /// <summary>
        /// Get setting by setting type <see cref="SettingType"/>
        /// </summary>
        Task<SettingDto> GetByTypeAsync(SettingType type);

        /// <summary>
        /// Updates existing setting entity or creates new one if does not exist.
        /// </summary>
        Task CreateUpdateAsync(SettingDto settingDto);

        /// <summary>
        /// Deletes setting entity.
        /// </summary>
        Task DeleteAsync(SettingType type);
    }
}
