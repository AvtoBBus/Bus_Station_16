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
        public DbSet<Expense> Expenses { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=LAPTOP-1SM76INE\mssqllocaldb;Database=ExpensesProjectDB;Trusted_Connection=True;");
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
