using System;
using System.Threading.Tasks;
using Diet.Core.Dtos;
using Diet.Core.ErrorHandling.Exceptions;
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
        public void Login_UserDoesNotExist_ThrowsBadRequestException()
        {
            var loginDto = new LoginDto
            {
                Email = "email",
                Password = "password"
            };

            Assert.ThrowsAsync<ValidationException>(async () => { await _accountService.Login(loginDto); });
            _userManagerMock.Verify(p => p.FindByNameAsync(loginDto.Email), Times.Once);
            _userManagerMock.Verify(p => p.FindByEmailAsync(loginDto.Email), Times.Once);
        }

        [Test]
        public void Login_PasswordIsNotCorrect_ThrowsBadRequestException()
        {
            var loginDto = new LoginDto
            {
                Email = "email",
                Password = "password"
            };
            var userEntity = new ApplicationUserEntity
            {
                Email = loginDto.Email
            };

            _userManagerMock.Setup(p => p.FindByNameAsync(loginDto.Email))
                .ReturnsAsync(userEntity);

            Assert.ThrowsAsync<ValidationException>(async () => { await _accountService.Login(loginDto); });
            _userManagerMock.Verify(p => p.FindByNameAsync(loginDto.Email), Times.Once);
            _userManagerMock.Verify(p => p.CheckPasswordAsync(userEntity, loginDto.Password), Times.Once);
        }

        [Test]
        public async Task Login_UserAndPasswordAreValid_GeneratesJwt()
        {
            var loginDto = new LoginDto
            {
                Email = "email",
                Password = "password"
            };
            var userEntity = new ApplicationUserEntity
            {
                Email = loginDto.Email
            };
            var expectedResult = new JwtDto();

            _userManagerMock.Setup(p => p.FindByNameAsync(loginDto.Email))
                .ReturnsAsync(userEntity);
            _userManagerMock.Setup(p => p.CheckPasswordAsync(userEntity, loginDto.Password)).ReturnsAsync(true);
            _jwtServiceMock.Setup(p => p.GenerateJwtAsync(userEntity)).ReturnsAsync(expectedResult);

            JwtDto actualResult = await _accountService.Login(loginDto);
            Assert.AreEqual(expectedResult, actualResult);
            _userManagerMock.Verify(p => p.FindByNameAsync(loginDto.Email), Times.Once);
            _userManagerMock.Verify(p => p.CheckPasswordAsync(userEntity, loginDto.Password), Times.Once);
            _jwtServiceMock.Verify(p => p.GenerateJwtAsync(userEntity), Times.Once);
        }

        [Test]
        public async Task Register_UserAndPasswordAreValid_GeneratesJwt()
        {
            var registerDto = new RegisterDto
            {
                Email = "email",
                Password = "password"
            };
            
            var expectedResult = new JwtDto();

            _userManagerMock.Setup(p =>
                    p.CreateAsync(It.Is<ApplicationUserEntity>(u => u.Email == registerDto.Email && u.UserName == registerDto.Email), registerDto.Password))
                .ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(p =>
                p.AddToRoleAsync(It.Is<ApplicationUserEntity>(u => u.Email == registerDto.Email && u.UserName == registerDto.Email), RolesConstants.User))
                .ReturnsAsync(IdentityResult.Success);
            _jwtServiceMock.Setup(p => p.GenerateJwtAsync(It.Is<ApplicationUserEntity>(u => u.Email == registerDto.Email && u.UserName == registerDto.Email))).ReturnsAsync(expectedResult);

            JwtDto actualResult = await _accountService.Register(registerDto);
            Assert.AreEqual(expectedResult, actualResult);
        }

        [Test]
        public async Task UpdateAccountInfoAsync_UserAndPasswordAreValid_SavesChanges()
        {
            var userId = Guid.NewGuid().ToString();
            var userEntity = new ApplicationUserEntity();
            var account = new AccountDto
            {
                Email = "email",
                Password = "password"
            };
            string token = Guid.NewGuid().ToString();

            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);
            _userManagerMock.Setup(p => p.FindByIdAsync(userId)).ReturnsAsync(userEntity);
            _userManagerMock.Setup(p => p.GeneratePasswordResetTokenAsync(userEntity)).ReturnsAsync(token);
            _userManagerMock.Setup(p => p.ResetPasswordAsync(userEntity, token, account.Password))
                .ReturnsAsync(IdentityResult.Success);
            _userManagerMock.Setup(p =>
                    p.UpdateAsync(
                        It.Is<ApplicationUserEntity>(u => u.Email == account.Email && u.UserName == account.Email)))
                .ReturnsAsync(IdentityResult.Success);

            await _accountService.UpdateAccountInfoAsync(account);
            _userHelperMock.VerifyAll();
            _userManagerMock.VerifyAll();
        }
    }
}
