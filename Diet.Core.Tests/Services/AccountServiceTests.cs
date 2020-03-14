using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.Exceptions;
using Diet.Core.Helpers.Interfaces;
using Diet.Core.Services;
using Diet.Core.Services.Interfaces;
using Diet.Database.Entities;
using Microsoft.AspNetCore.Identity;
using Moq;
using NUnit.Framework;

namespace Diet.Core.Tests.Services
{
    public class AccountServiceTests
    {
        private Mock<UserManager<ApplicationUserEntity>> _userManagerMock;
        private Mock<IUserHelper> _userHelperMock;
        private Mock<IJwtService> _jwtServiceMock;

        private AccountService _accountService;

        [SetUp]
        public void Setup()
        {
            var userStoreMock = new Mock<IUserStore<ApplicationUserEntity>>();
            _userManagerMock = new Mock<UserManager<ApplicationUserEntity>>(userStoreMock.Object, null, null, null, null, null, null, null, null);
            _userHelperMock = new Mock<IUserHelper>();
            _jwtServiceMock = new Mock<IJwtService>();

            _accountService = new AccountService(_userManagerMock.Object, _userHelperMock.Object, _jwtServiceMock.Object);
        }

        [Test]
        public void Get_UserDoesNotExist_ThrowsBadRequestException()
        {
            var loginDto = new LoginDto
            {
                Email = "email",
                Password = "password"
            };

            Assert.ThrowsAsync<BadRequestException>(async () => { await _accountService.Login(loginDto); });
            _userManagerMock.Verify(p => p.FindByNameAsync(loginDto.Email), Times.Once);
            _userManagerMock.Verify(p => p.FindByEmailAsync(loginDto.Email), Times.Once);
        }

        //[Test]
        //public void Get_PasswordIsNotCorrect_ThrowsBadRequestException()
        //{
        //    var loginDto = new LoginDto
        //    {
        //        Email = "email",
        //        Password = "password"
        //    };

        //    _userManagerMock.Setup(p => p.FindByNameAsync(loginDto.Email)).Returns()

        //    Assert.ThrowsAsync<BadRequestException>(async () => { await _accountService.Login(loginDto); });
        //    _userManagerMock.Verify(p => p.FindByNameAsync(loginDto.Email), Times.Once);
        //    _userManagerMock.Verify(p => p.FindByEmailAsync(loginDto.Email), Times.Once);
        //}
    }
}
