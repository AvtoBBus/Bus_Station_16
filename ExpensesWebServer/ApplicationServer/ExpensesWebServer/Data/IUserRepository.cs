using ExpensesWebServer.Models.Entities;

namespace ExpensesWebServer.Data
{
    public interface IUserRepository
    {
        public Task<int> CreateAsync(User user);
        public Task<User> GetByLoginAsync(string user);
        public Task<User> GetByIdAsync(int id);
    }
}
