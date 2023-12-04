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
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.UserLogin).IsUnique();
            modelBuilder.Entity<User>().HasAlternateKey(u => u.UserLogin);

            modelBuilder.Entity<Expense>().HasIndex(u => u.Category);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                UserLogin = "Tom",
                UserPassword = "test",
                Salt = string.Empty
            });
        }
    }

}
