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
        /// Creates new setting entity.
        /// </summary>
        Task CreateAsync(SettingDto settingDto);

        /// <summary>
        /// Updates existing setting entity.
        /// </summary>
        Task UpdateAsync(SettingDto settingDto);

        /// <summary>
        /// Deletes setting entity.
        /// </summary>
        Task DeleteAsync(SettingType type);
    }
}
