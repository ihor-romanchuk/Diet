using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;
using Diet.Database.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diet.SPA.Controllers
{
    /// <summary>
    /// Provides CRUD operations on settings,
    /// </summary>
    [Authorize(Roles = RolesConstants.User + "," + RolesConstants.Administrator)]
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

        [HttpGet("{type}")]
        public async Task<SettingDto> Get(SettingType type)
        {
            SettingDto result = await _settingsService.GetByTypeAsync(type);

            return result;
        }

        [HttpPut("{type}")]
        public async Task<ActionResult> CreateUpdate(SettingType type, [FromBody]SettingDto mealDto)
        {
            mealDto.Type = type;
            await _settingsService.CreateUpdateAsync(mealDto);

            return NoContent();
        }

        [HttpDelete("{type}")]
        public async Task<ActionResult> Delete(SettingType type)
        {
            await _settingsService.DeleteAsync(type);

            return NoContent();
        }
    }
}
