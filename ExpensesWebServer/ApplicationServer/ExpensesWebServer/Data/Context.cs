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
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-PMP9UHE;Database=ExpensesProjectDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.UserLogin).IsUnique();
            modelBuilder.Entity<User>().HasAlternateKey(u => u.UserLogin);

            modelBuilder.Entity<Expense>().HasIndex(u => u.Category);
        }
    }

}
