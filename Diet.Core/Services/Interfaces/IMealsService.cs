﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    public interface IMealsService
    {
        Task<List<MealDto>> GetAsync();

        Task<MealDto> GetByIdAsync(int id);

        Task CreateAsync(MealDto mealDto);

        Task UpdateAsync(MealDto mealDto);

        Task DeleteAsync(int id);
    }
}