using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    /// <summary>
    /// Provides APIs to work with user meals.
    /// </summary>
    public interface IMealsService
    {
        /// <summary>
        /// Gets list of user meals for specific date and time range.
        /// </summary>
        /// <returns>List of meals</returns>
        Task<List<MealDto>> GetAsync(DateTime? startDate, DateTime? endDate, DateTime? startTime, DateTime? endTime);

        /// <summary>
        /// Get meal by it's id.
        /// </summary>
        Task<MealDto> GetByIdAsync(int id);

        /// <summary>
        /// Creates new meal entity.
        /// </summary>
        Task CreateAsync(MealDto mealDto);

        /// <summary>
        /// Updates existing meal entity.
        /// </summary>
        Task UpdateAsync(MealDto mealDto);

        /// <summary>
        /// Deletes meal entity.
        /// </summary>
        Task DeleteAsync(int id);
    }
}
