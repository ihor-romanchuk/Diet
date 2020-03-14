using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Diet.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Diet.SPA
{
    public static class HostExtensions
    {
        public static IHost Migrate(this IHost host)
        {
            using (IServiceScope scope = host.Services.GetService<IServiceScopeFactory>().CreateScope())
            {
                using (var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                {
                    dbContext.Database.Migrate();
                }
            }
            return host;
        }

        public static IHost Seed(this IHost host)
        {
            using (IServiceScope scope = host.Services.CreateScope())
            {
                var databaseDataInitializer = scope.ServiceProvider.GetRequiredService<IDatabaseDataInitializer>();
                Task task = Task.Run(async () => { await databaseDataInitializer.SeedRolesAsync(); });
                task.Wait();
            }

            return host;
        }
    }
}
