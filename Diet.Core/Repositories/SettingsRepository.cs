using System.Linq;
using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Diet.Core.Repositories.Interfaces;
using Diet.Database;
using Diet.Database.Entities;
using Diet.Database.Enums;
using Microsoft.EntityFrameworkCore;

namespace Diet.Core.Repositories
{
    public class SettingsRepository: ISettingsRepository
    {
        private readonly IApplicationDbContext _dbContext;
        private readonly IUserHelper _userHelper;

        public SettingsRepository(IApplicationDbContext dbContext, IUserHelper userHelper)
        {
            _dbContext = dbContext;
            _userHelper = userHelper;
        }

        public IQueryable<SettingEntity> Get()
        {
            return _dbContext.Settings.Where(m => m.UserId == _userHelper.UserId);
        }

        public async Task<SettingEntity> GetByTypeAsync(SettingType type)
        {
            return await _dbContext.Settings.FirstOrDefaultAsync(m => m.UserId == _userHelper.UserId && m.Type == type);
        }

        public async Task CreateAsync(SettingEntity setting)
        {
            setting.UserId = _userHelper.UserId;
            _dbContext.Settings.Add(setting);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(SettingEntity setting)
        {
            setting.UserId = _userHelper.UserId;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(SettingEntity setting)
        {
            _dbContext.Remove(setting);
            await _dbContext.SaveChangesAsync();
        }
    }
}
