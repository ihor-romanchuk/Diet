using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Database.Entities;

namespace Diet.Core.Repositories.Interfaces
{
    interface IMealsRepository
    {
        IEnumerable<MealEntity> Get(string userId);

        Task CreateUpdate(MealEntity meal);

        Task Delete(int id);
    }
}
