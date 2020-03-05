using System.Linq;
using System.Threading.Tasks;
using Diet.Database.Entities;

namespace Diet.Core.Repositories.Interfaces
{
    public interface IMealsRepository
    {
        IQueryable<MealEntity> Get(string userId);

        Task<MealEntity> GetById(int id);

        Task Create(MealEntity meal);

        Task Update(MealEntity meal);

        Task Delete(int id);
    }
}
