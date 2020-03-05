using System.Linq;
using System.Threading.Tasks;
using Diet.Database.Entities;

namespace Diet.Core.Repositories.Interfaces
{
    public interface IMealsRepository
    {
        IQueryable<MealEntity> Get(string userId);

        Task CreateUpdate(MealEntity meal);

        Task Delete(int id);
    }
}
