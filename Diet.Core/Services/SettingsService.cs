using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Diet.Core.Dtos;
using Diet.Core.Repositories.Interfaces;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Diet.Database.Enums;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Services
{
    public class SettingsService: ISettingsService
    {
        private readonly IMapper _mapper;
        private readonly ISettingsRepository _settingsRepository;

        public SettingsService(IMapper mapper, ISettingsRepository settingsRepository)
        {
            _mapper = mapper;
            _settingsRepository = settingsRepository;
        }

        public async Task<List<SettingDto>> GetAsync()
        {
            List<SettingDto> meals = await _settingsRepository.Get().ProjectTo<SettingDto>(_mapper.ConfigurationProvider).ToListAsync();

            return meals;
        }

        public async Task<SettingDto> GetByTypeAsync(SettingType type)
        {
            var result = _mapper.Map<SettingDto>(await _settingsRepository.GetByTypeAsync(type));

            return result;
        }

        public async Task CreateAsync(SettingDto settingDto)
        {
            var settingEntity = _mapper.Map<SettingEntity>(settingDto);

            await _settingsRepository.CreateAsync(settingEntity);
        }

        public async Task UpdateAsync(SettingDto settingDto)
        {
            SettingEntity settingEntity = await _settingsRepository.GetByTypeAsync(settingDto.Type);

            //todo: throw not found exception
            if (settingEntity != null)
            {
                _mapper.Map(settingDto, settingEntity);
                await _settingsRepository.UpdateAsync(settingEntity);
            }
        }

        public async Task DeleteAsync(SettingType type)
        {
            SettingEntity settingEntity = await _settingsRepository.GetByTypeAsync(type);

            //todo: throw NotFoundException
            if (settingEntity != null)
            {
                await _settingsRepository.DeleteAsync(settingEntity);
            }
        }
    }
}
