﻿using Diet.Database.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Diet.Database
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUserEntity>, IApplicationDbContext
    {
        public ApplicationDbContext(
            DbContextOptions options) : base(options)
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

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Meals)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Meals_User")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<SettingEntity>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.Type)
                    .IsRequired();

                entity.Property(e => e.Value)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Settings)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Settings_User")
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
