using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Diet.Core.Dtos;
using Diet.Core.Repositories.Interfaces;
using Diet.Core.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Services
{
    public class MealsService: IMealsService
    {
        private readonly IMapper _mapper;
        private readonly IMealsRepository _mealsRepository;

        public MealsService(IMapper mapper, IMealsRepository mealsRepository)
        {
            _mapper = mapper;
            _mealsRepository = mealsRepository;
        }

        public async Task<List<MealDto>> Get(string userId)
        {
            List<MealDto> meals = await _mealsRepository.Get(userId).ProjectTo<MealDto>(_mapper.ConfigurationProvider).ToListAsync();

            return meals;
        }

        public Task CreateUpdate(MealDto mealDto)
        {
            if (mealDto.Id == 0)
            {

            }
            else
            {
                
            }
            var mealEntity = _mealsRepository.GetById()
        }

        public Task Delete(int id)
        {
            throw new System.NotImplementedException();
        }
    }
}
