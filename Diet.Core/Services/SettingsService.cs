using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Diet.Core.Dtos;
using Diet.Core.ErrorHandling.Exceptions;
using Diet.Core.Repositories.Interfaces;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Diet.Database.Enums;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Services
{
    /// <inheritdoc />
    public class SettingsService: ISettingsService
    {
        private readonly IMapper _mapper;
        private readonly ISettingsRepository _settingsRepository;

        public SettingsService(IMapper mapper, ISettingsRepository settingsRepository)
        {
            _mapper = mapper;
            _settingsRepository = settingsRepository;
        }

        /// <inheritdoc />
        public async Task<List<SettingDto>> GetAsync()
        {
            List<SettingDto> meals = await _settingsRepository.Get().ProjectTo<SettingDto>(_mapper.ConfigurationProvider).ToListAsync();

            return meals;
        }

        /// <inheritdoc />
        public async Task<SettingDto> GetByTypeAsync(SettingType type)
        {
            SettingEntity settingEntity = await _settingsRepository.GetByTypeAsync(type);
            if(settingEntity == null)
                throw new NotFoundException();


            var result = _mapper.Map<SettingDto>(await _settingsRepository.GetByTypeAsync(type));
            return result;
        }

        /// <inheritdoc />
        public async Task CreateAsync(SettingDto settingDto)
        {
            var settingEntity = _mapper.Map<SettingEntity>(settingDto);

            await _settingsRepository.CreateAsync(settingEntity);
        }

        /// <inheritdoc />
        public async Task UpdateAsync(SettingDto settingDto)
        {
            SettingEntity settingEntity = await _settingsRepository.GetByTypeAsync(settingDto.Type);

            if (settingEntity == null)
                throw new NotFoundException();

            _mapper.Map(settingDto, settingEntity);
            await _settingsRepository.UpdateAsync(settingEntity);
        }

        /// <inheritdoc />
        public async Task DeleteAsync(SettingType type)
        {
            SettingEntity settingEntity = await _settingsRepository.GetByTypeAsync(type);

            if (settingEntity == null)
                throw new NotFoundException();

            await _settingsRepository.DeleteAsync(settingEntity);
        }
    }
}
