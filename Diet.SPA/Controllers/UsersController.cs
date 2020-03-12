using System.Collections.Generic;
using System.Threading.Tasks;
using Diet.Core;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diet.SPA.Controllers
{
    [Authorize(Roles = RolesConstants.Manager + "," + RolesConstants.Administrator)]
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpGet("")]
        public async Task<List<UserDto>> Get()
        {
            List<UserDto> result = await _usersService.GetAsync();

            return result;
        }

        [HttpGet("{id}")]
        public async Task<UserDto> Get(string id)
        {
            UserDto result = await _usersService.GetByIdAsync(id);

            return result;
        }

        [HttpPost("")]
        public async Task<ActionResult> Create(UserDto userDto)
        {
            await _usersService.CreateAsync(userDto);

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(string id, [FromBody]UserDto userDto)
        {
            userDto.Id = id;
            await _usersService.UpdateAsync(userDto);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            await _usersService.DeleteAsync(id);

            return NoContent();
        }
    }
}
