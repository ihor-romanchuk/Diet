using System;
using System.Linq;
using System.Threading.Tasks;
using Diet.Core.Repositories.Interfaces;
using Diet.Database;
using Diet.Database.Entities;
using Microsoft.EntityFrameworkCore;

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

        public async Task<MealEntity> GetById(int id)
        {
            return await _dbContext.Meals.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task Create(MealEntity meal)
        {
            _dbContext.Meals.Add(meal);
            await _dbContext.SaveChangesAsync();
        }

        public async Task Update(MealEntity meal)
        {
            await _dbContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            MealEntity mealEntity = await _dbContext.Meals.FirstOrDefaultAsync(m => m.Id == id);

            _dbContext.Remove(mealEntity);
            await _dbContext.SaveChangesAsync();
        }
    }
}
