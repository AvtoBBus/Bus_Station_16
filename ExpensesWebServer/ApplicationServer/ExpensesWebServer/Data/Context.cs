using ExpensesWebServer.Converters;
using ExpensesWebServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpensesWebServer.Data
{
    public class Context: DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Expense> Expenses { get; set; }
        protected override void ConfigureConventions(ModelConfigurationBuilder builder)
        {

            builder.Properties<DateOnly>()
                .HaveConversion<DateOnlyConverter>()
                .HaveColumnType("date");

            base.ConfigureConventions(builder);

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.UserLogin).IsUnique();
            modelBuilder.Entity<User>().HasAlternateKey(u => u.UserLogin);

            modelBuilder.Entity<Expense>().HasIndex(u => u.Category);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserLogin = "Ivan",
                UserPassword = "ThereMustBeHashedPasswdWithSalt",
                Salt = string.Empty
            });
        }
    }

}
