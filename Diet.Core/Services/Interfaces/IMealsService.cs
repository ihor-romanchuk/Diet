using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;

namespace Diet.Core.Services.Interfaces
{
    public interface IMealsService
    {
        Task<List<MealDto>> Get(string userId);
    }
}
