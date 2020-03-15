using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Diet.Core.Dtos;
using Diet.Core.ErrorHandling.Exceptions;
using Diet.Core.Repositories.Interfaces;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Services
{
    /// <inheritdoc />
    public class MealsService: IMealsService
    {
        private readonly IMapper _mapper;
        private readonly IMealsRepository _mealsRepository;

        public MealsService(IMapper mapper, IMealsRepository mealsRepository)
        {
            _mapper = mapper;
            _mealsRepository = mealsRepository;
        }

        /// <inheritdoc />
        public async Task<List<MealDto>> GetAsync(DateTime? startDate, DateTime? endDate, DateTime? startTime, DateTime? endTime)
        {
            IQueryable<MealEntity> meals = _mealsRepository.Get();

            if (startDate.HasValue && endDate.HasValue && startDate.Value == endDate.Value)
                endDate = endDate.Value.AddDays(1);

            if (startDate.HasValue)
                meals = meals.Where(m => m.DateTimeCreated >= startDate.Value);

            if (endDate.HasValue)
                meals = meals.Where(m => m.DateTimeCreated <= endDate.Value);

            if (startTime!= endTime)
            {
                if(startTime.HasValue && endTime.HasValue && startTime.Value.Date < endTime.Value.Date)
                {
                    meals = meals.Where(m => m.DateTimeCreated.TimeOfDay >= startTime.Value.TimeOfDay || m.DateTimeCreated.TimeOfDay <= endTime.Value.TimeOfDay);
                }
                else
                {
                    if (startTime.HasValue)
                        meals = meals.Where(m => m.DateTimeCreated.TimeOfDay >= startTime.Value.TimeOfDay);

                    if (endTime.HasValue)
                        meals = meals.Where(m => m.DateTimeCreated.TimeOfDay <= endTime.Value.TimeOfDay);
                }
            }

            return await meals.ProjectTo<MealDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        /// <inheritdoc />
        public async Task<MealDto> GetByIdAsync(int id)
        {
            MealEntity mealEntity = await _mealsRepository.GetByIdAsync(id);
            if(mealEntity == null)
                throw new NotFoundException();

            var result = _mapper.Map<MealDto>(mealEntity);
            return result;
        }

        /// <inheritdoc />
        public async Task CreateAsync(MealDto mealDto)
        {
            mealDto.Id = 0;
            var mealEntity = _mapper.Map<MealEntity>(mealDto);

            await _mealsRepository.CreateAsync(mealEntity);
        }

        /// <inheritdoc />
        public async Task UpdateAsync(MealDto mealDto)
        {
            MealEntity mealEntity = null;

            if (mealDto.Id != 0)
            {
                mealEntity = await _mealsRepository.GetByIdAsync(mealDto.Id);
            }

            if(mealEntity == null)
                throw new NotFoundException();

            _mapper.Map(mealDto, mealEntity);
            await _mealsRepository.UpdateAsync(mealEntity);
        }

        /// <inheritdoc />
        public async Task DeleteAsync(int id)
        {
            MealEntity mealEntity = await _mealsRepository.GetByIdAsync(id);

            if (mealEntity == null)
                throw new NotFoundException();

            await _mealsRepository.DeleteAsync(mealEntity);
        }
    }
}
