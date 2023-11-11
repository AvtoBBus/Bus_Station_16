using ExpensesWebServer.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace ExpensesWebServer.Data
{
    public class UserRepository : IUserRepository
    { 

        private UserContext _context;
        public UserRepository(UserContext context)
        {
            _context = context;
        }
        public async Task<int> Create(User user)
        {
            await _context.Users.AddAsync(user);
            return _context.SaveChanges();
        }
        public async Task<User> GetByLogin(string login) => await _context.Users.FirstOrDefaultAsync(u => u.Login == login);
        public async Task<User> GetById(int id) => await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
    }
}
