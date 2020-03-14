using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diet.SPA.Controllers
{
    /// <summary>
    /// Provides APIs for account management.
    /// </summary>
    [Authorize]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<JwtDto> Login([FromBody] LoginDto model)
        {
            JwtDto result = await _accountService.Login(model);

            return result;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<JwtDto> Register([FromBody] RegisterDto model)
        {
            JwtDto result = await _accountService.Register(model);

            return result;
        }

        [HttpPost("")]
        public async Task<ActionResult> UpdateAccountInfo([FromBody] AccountDto account)
        {
            await _accountService.UpdateAccountInfoAsync(account);
            return NoContent();
        }
    }
}