using System.Linq;
using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Diet.Core.Repositories.Interfaces;
using Diet.Database;
using Diet.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Repositories
{
    /// <inheritdoc />
    public class MealsRepository: IMealsRepository
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IUserHelper _userHelper;

        public MealsRepository(IApplicationDbContext dbContext, IUserHelper userHelper)
        {
            _dbContext = dbContext;
            _userHelper = userHelper;
        }

        /// <inheritdoc />
        public IQueryable<MealEntity> Get()
        {
            return _dbContext.Meals.Where(m => m.UserId == _userHelper.UserId);
        }

        /// <inheritdoc />
        public async Task<MealEntity> GetByIdAsync(int id)
        {
            return await _dbContext.Meals.FirstOrDefaultAsync(m => m.UserId == _userHelper.UserId && m.Id == id);
        }

        /// <inheritdoc />
        public async Task CreateAsync(MealEntity meal)
        {
            meal.UserId = _userHelper.UserId;
            _dbContext.Meals.Add(meal);
            await _dbContext.SaveChangesAsync();
        }

        /// <inheritdoc />
        public async Task UpdateAsync(MealEntity meal)
        {
            meal.UserId = _userHelper.UserId;
            await _dbContext.SaveChangesAsync();
        }

        /// <inheritdoc />
        public async Task DeleteAsync(MealEntity meal)
        {
            _dbContext.Remove(meal);
            await _dbContext.SaveChangesAsync();
        }
    }
}
