using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Diet.Core.Repositories;
using Diet.Database;
using Diet.Database.Entities;
using Diet.Database.Enums;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;

namespace Diet.Core.Tests.Repositories
{
    public class Tests
    {
        private readonly List<SettingEntity> _settingsData = GetSettingsData();

        private Mock<IApplicationDbContext> _dbContextMock;
        private Mock<DbSet<SettingEntity>> _settingsMock;
        private Mock<IUserHelper> _userHelperMock;

        private SettingsRepository _settingsRepository;

        private static List<SettingEntity> GetSettingsData()
        {
            return new List<SettingEntity>
                {
                    new SettingEntity
                    {
                        UserId = "1",
                        Type = SettingType.CaloriesPerDay,
                        Value = "100"
                    },
                    new SettingEntity
                    {
                        UserId = "2",
                        Type = SettingType.CaloriesPerDay,
                        Value = "200"
                    }
            };
        }

        [SetUp]
        public void Setup()
        {
            _userHelperMock = new Mock<IUserHelper>();
            _dbContextMock = new Mock<IApplicationDbContext>();
            _settingsMock = _settingsData.AsQueryable().BuildMockDbSet();
            _dbContextMock.Setup(p => p.Settings).Returns(_settingsMock.Object);

            _settingsRepository = new SettingsRepository(_dbContextMock.Object, _userHelperMock.Object);
        }

        [Test]
        public void Get_FiltersByUserId()
        {
            var userId = _settingsData.First().UserId;
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            List<SettingEntity> expectedResult = _settingsData.Where(s => s.UserId == userId).ToList();
            List<SettingEntity> actualResult = _settingsRepository.Get().ToList();

            Assert.That(actualResult, Is.EquivalentTo(expectedResult));
        }

        [Test]
        public async Task GetByTypeAsync_FiltersByUserIdAndType()
        {
            var userId = _settingsData.First().UserId;
            SettingType type = _settingsData.First().Type;
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            SettingEntity expectedResult = _settingsData.Single(s => s.UserId == userId && s.Type == type);
            SettingEntity actualResult = await _settingsRepository.GetByTypeAsync(type);

            Assert.AreEqual(expectedResult, actualResult);
        }

        [Test]
        public async Task CreateAsync_AddsSettingAndSavesChanges()
        {
            var setting = new SettingEntity
            {
                Type = SettingType.CaloriesPerDay,
                Value = "10"
            };
            string userId = Guid.NewGuid().ToString();
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            await _settingsRepository.CreateAsync(setting);
            Assert.AreEqual(userId, setting.UserId);
            _settingsMock.Verify(p => p.Add(setting), Times.Once);
            _dbContextMock.Verify(p => p.SaveChangesAsync(default), Times.Once);

        }

        [Test]
        public async Task UpdateAsync_UpdatesUserIdAndSavesChanges()
        {
            var setting = new SettingEntity
            {
                Type = SettingType.CaloriesPerDay,
                Value = "10"
            };
            string userId = Guid.NewGuid().ToString();
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            await _settingsRepository.UpdateAsync(setting);
            Assert.AreEqual(userId, setting.UserId);
            _dbContextMock.Verify(p => p.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public async Task DeleteAsync_RemovesSettingAndSavesChanges()
        {
            SettingEntity setting = _settingsData.First();
            await _settingsRepository.DeleteAsync(setting);
            _dbContextMock.Verify(p => p.Remove(setting), Times.Once);
            _dbContextMock.Verify(p => p.SaveChangesAsync(default), Times.Once);
        }
    }
}