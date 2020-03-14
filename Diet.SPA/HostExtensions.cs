using System.Threading.Tasks;
using Diet.Core.Helpers.Interfaces;
using Diet.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Diet.SPA
{
    /// <summary>
    /// Provides extension methods for <see cref="IHost"/> interface.
    /// </summary>
    public static class HostExtensions
    {
        /// <summary>
        /// Migrates database to latest migration.
        /// </summary>
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

        /// <summary>
        /// Seeds database with initial data.
        /// </summary>
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
