using Diet.Database.Entities;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Diet.Database
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUserEntity>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public virtual DbSet<MealEntity> Meals { get; set; }

        public virtual DbSet<SettingEntity> Settings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MealEntity>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .HasMaxLength(200)
                    .IsRequired();

                entity.Property(e => e.DateTimeCreated).HasDefaultValueSql("GETUTCDATE()");

                entity.HasOne(p => p.User)
                    .WithOne(d => d.Meals)
                    .HasForeignKey<MealEntity>(d => d.UserId);
            });
        }
    }
}
