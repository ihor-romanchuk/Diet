using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Repositories.Interfaces;
using Diet.Database.Entities;

namespace Diet.Core.Repositories
{
    public class MealsRepository: IMealsRepository
    {
        public IEnumerable<MealEntity> Get(string userId)
        {
            throw new NotImplementedException();
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
