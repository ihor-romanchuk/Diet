using System;
using System.Linq;
using System.Threading.Tasks;
using Diet.Core.Repositories.Interfaces;
using Diet.Database;
using Diet.Database.Entities;

namespace Diet.Core.Repositories
{
    public class MealsRepository: IMealsRepository
    {
        private readonly IApplicationDbContext _dbContext;

        public MealsRepository(IApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<MealEntity> Get(string userId)
        {
            return _dbContext.Meals.Where(m => m.UserId == userId);
        }

        public Task CreateUpdate(MealEntity meal)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
