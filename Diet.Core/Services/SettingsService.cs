using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;

namespace Diet.Core.Services
{
    public class SettingsService: ISettingsService
    {
        public Task<List<SettingDto>> GetAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SettingDto> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task CreateAsync(SettingDto settingDto)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(SettingDto settingDto)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
