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
    [Route("api/settings")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;

        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        [HttpGet("")]
        public async Task<List<SettingDto>> Get()
        {
            List<SettingDto> result = await _settingsService.GetAsync();

            return result;
        }

        [HttpGet("{id}")]
        public async Task<SettingDto> Get(int id)
        {
            SettingDto result = await _settingsService.GetByIdAsync(id);

            return result;
        }

        [HttpPost("")]
        public async Task<ActionResult> Create(SettingDto mealDto)
        {
            await _settingsService.CreateAsync(mealDto);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody]SettingDto mealDto)
        {
            mealDto.Id = id;
            await _settingsService.UpdateAsync(mealDto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _settingsService.DeleteAsync(id);

            return NoContent();
        }
    }
}
