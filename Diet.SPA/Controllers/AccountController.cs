using System;
using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Diet.SPA.Controllers
{
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
            //todo: add validation
            if (ModelState.IsValid)
            {
                JwtDto result = await _accountService.Register(model);

                return result;
            }

            throw new ApplicationException("UNKNOWN_ERROR");//todo
        }

        [HttpPost("")]
        public async Task<ActionResult> UpdateAccountInfo([FromBody] AccountDto account)
        {
            //todo: validation
            await _accountService.UpdateAccountInfoAsync(account);
            return NoContent();
        }
    }
}