using ExpensesWebServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpensesWebServer.Data
{
    public class UserContext: DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        { 
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }
        public DbSet<User> Users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            this.Add(new User
            {
                Login = "Admin",
                Password = "password",
                Salt = "some slat",
                Expenses = new List<Expense>() 
            });
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Login).IsUnique();
        }
    }

}
