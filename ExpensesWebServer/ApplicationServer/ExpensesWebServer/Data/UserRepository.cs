using ExpensesWebServer.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExpensesWebServer.Data
{
    public class UserRepository : IUserRepository
    { 

        private Context _context;
        public UserRepository(Context context)
        {
            _context = context;
        }
        public async Task<int> CreateAsync(User user)
        {
            await _context.Users.AddAsync(user);
            return _context.SaveChanges();
        }
        public Task<List<User>> GetListOfObjects()=>_context.Users.ToListAsync();

        public User Update(User entity)
        {
            var dbEntity = _context.Users.FirstOrDefault(ex => ex.Id == entity.Id);
            if (dbEntity == null) throw new ArgumentException($"User with id =={entity.Id} not found");
            _context.Users.Update(entity);
            _context.SaveChanges();
            return entity;
        }

        public void Delete(int id)
        {
            var entity = _context.Expenses.FirstOrDefault(u => u.Id == id);
            if (entity == null) throw new ArgumentException($"User with id =={id} not found");
            _context.Expenses.Remove(entity);
            _context.SaveChanges();
        }
        public async Task<User> GetByLoginAsync(string login)
        { 
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserLogin == login);
            if (user == null) throw new ArgumentException($"User with login=={login} not found");
            return user;
        }
        public async Task<User> GetByIdAsync(int id)
            { 
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) throw new ArgumentException($"User with id=={id} not found");
            return user;
        }
    }
}
