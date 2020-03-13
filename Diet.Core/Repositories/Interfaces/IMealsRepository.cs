using System.Linq;
using System.Threading.Tasks;
using Diet.Database.Entities;

namespace Diet.Core.Repositories.Interfaces
{
    /// <summary>
    /// Provides CRUD operations for Meal entity.
    /// </summary>
    public interface IMealsRepository
    {
        /// <summary>
        /// Gets IQueryable of meal entities.
        /// </summary>
        IQueryable<MealEntity> Get();

        /// <summary>
        /// Gets meal entity by id.
        /// </summary>
        Task<MealEntity> GetByIdAsync(int id);

        /// <summary>
        /// Stores new meal entity to database.
        /// </summary>
        Task CreateAsync(MealEntity meal);

        /// <summary>
        /// Updates existing meal entity in database.
        /// </summary>
        Task UpdateAsync(MealEntity meal);

        /// <summary>
        /// Deletes meal entity from database.
        /// </summary>
        Task DeleteAsync(MealEntity meal);
    }
}
