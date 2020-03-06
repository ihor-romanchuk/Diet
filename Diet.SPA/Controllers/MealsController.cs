using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diet.SPA.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MealsController : ControllerBase
    {
        private readonly IMealsService _mealsService;

        public MealsController(IMealsService mealsService)
        {
            _mealsService = mealsService;
        }

        [HttpGet("")]
        public async Task<List<MealDto>> Get() //todo: remove id from MealDto
        {
            List<MealDto> result = await _mealsService.GetAsync();

            return result;
        }

        [HttpGet("{id}")]
        public async Task<MealDto> Get(int id)
        {
            MealDto result = await _mealsService.GetByIdAsync(id);

            return result;
        }

        [HttpPost("")]
        public async Task<ActionResult> Create(MealDto mealDto)
        {
            await _mealsService.CreateAsync(mealDto);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody]MealDto mealDto)
        {
            mealDto.Id = id;
            await _mealsService.UpdateAsync(mealDto);

            return NoContent();
        }

        [HttpDelete("")]
        public async Task<ActionResult> Delete(int id)
        {
            await _mealsService.DeleteAsync(id);

            return NoContent();
        }
    }
}