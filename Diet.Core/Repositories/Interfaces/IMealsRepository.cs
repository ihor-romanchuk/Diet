using System.Linq;
using System.Threading.Tasks;
using Diet.Database.Entities;

namespace Diet.Core.Repositories.Interfaces
{
    public interface IMealsRepository
    {
        IQueryable<MealEntity> Get();

        Task<MealEntity> GetByIdAsync(int id);

        Task CreateAsync(MealEntity meal);

        Task UpdateAsync(MealEntity meal);

        Task DeleteAsync(MealEntity meal);
    }
}
