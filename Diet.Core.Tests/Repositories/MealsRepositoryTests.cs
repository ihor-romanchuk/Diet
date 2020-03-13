using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Diet.Core.Repositories;
using Diet.Database;
using Diet.Database.Entities;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;
using NUnit.Framework;

namespace Diet.Core.Tests.Repositories
{
    public class MealsRepositoryTests
    {
        private readonly List<MealEntity> _mealsData = GetMealsData();

        private Mock<IApplicationDbContext> _dbContextMock;
        private Mock<DbSet<MealEntity>> _mealsMock;
        private Mock<IUserHelper> _userHelperMock;

        private MealsRepository _mealsRepository;

        private static List<MealEntity> GetMealsData()
        {
            return new List<MealEntity>
                {
                    new MealEntity
                    {
                        Id = 0,
                        Name = "Sushi",
                        Calories = 200,
                        DateTimeCreated = DateTime.Now,
                        UserId = "2"
                    },
                    new MealEntity
                    {
                        Id = 1,
                        Name = "Soup",
                        Calories = 100,
                        DateTimeCreated = DateTime.Now,
                        UserId = "1"
                    },
                    new MealEntity
                    {
                        Id = 0,
                        Name = "Potato",
                        Calories = 300,
                        DateTimeCreated = DateTime.Now,
                        UserId = "1"
                    }
            };
        }

        [SetUp]
        public void Setup()
        {
            _userHelperMock = new Mock<IUserHelper>();
            _dbContextMock = new Mock<IApplicationDbContext>();
            _mealsMock = _mealsData.AsQueryable().BuildMockDbSet();
            _dbContextMock.Setup(p => p.Meals).Returns(_mealsMock.Object);

            _mealsRepository = new MealsRepository(_dbContextMock.Object, _userHelperMock.Object);
        }

        [Test]
        public void Get_FiltersByUserId()
        {
            var userId = _mealsData.First().UserId;
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            List<MealEntity> expectedResult = _mealsData.Where(s => s.UserId == userId).ToList();
            List<MealEntity> actualResult = _mealsRepository.Get().ToList();

            Assert.That(actualResult, Is.EquivalentTo(expectedResult));
        }

        [Test]
        public async Task GetByIdAsync_FiltersByUserIdAndId()
        {
            MealEntity expectedResult = _mealsData.Last();
            _userHelperMock.SetupGet(p => p.UserId).Returns(expectedResult.UserId);

            MealEntity actualResult = await _mealsRepository.GetByIdAsync(expectedResult.Id);

            Assert.AreEqual(expectedResult, actualResult);
        }

        [Test]
        public async Task CreateAsync_AddsMealAndSavesChanges()
        {
            var meal = new MealEntity
            {
                Id = 10
            };
            string userId = Guid.NewGuid().ToString();
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            await _mealsRepository.CreateAsync(meal);
            Assert.AreEqual(userId, meal.UserId);
            _mealsMock.Verify(p => p.Add(meal), Times.Once);
            _dbContextMock.Verify(p => p.SaveChangesAsync(default), Times.Once);

        }

        [Test]
        public async Task UpdateAsync_UpdatesUserIdAndSavesChanges()
        {
            var meal = new MealEntity
            {
                Id = 10
            };
            string userId = Guid.NewGuid().ToString();
            _userHelperMock.SetupGet(p => p.UserId).Returns(userId);

            await _mealsRepository.UpdateAsync(meal);
            Assert.AreEqual(userId, meal.UserId);
            _dbContextMock.Verify(p => p.SaveChangesAsync(default), Times.Once);
        }

        [Test]
        public async Task DeleteAsync_RemovesMealAndSavesChanges()
        {
            MealEntity meal = _mealsData.First();
            await _mealsRepository.DeleteAsync(meal);
            _dbContextMock.Verify(p => p.Remove(meal), Times.Once);
            _dbContextMock.Verify(p => p.SaveChangesAsync(default), Times.Once);
        }
    }
}
