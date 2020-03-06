using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Diet.Core.Helpers
{
    public class DatabaseDataInitializer: IDatabaseDataInitializer
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public DatabaseDataInitializer(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }

        public async Task SeedRolesAsync()
        {
            string[] roles = { RolesConstants.User, RolesConstants.Manager, RolesConstants.Administrator };

            foreach (var role in roles)
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    await _roleManager.CreateAsync(new IdentityRole { Name = RolesConstants.User });
                }
            }
        }
    }
}
