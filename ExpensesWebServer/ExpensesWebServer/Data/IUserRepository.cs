using ExpensesWebServer.Models.Entities;

namespace ExpensesWebServer.Data
{
    public interface IUserRepository
    {
        public Task<int> Create(User user);
        public Task<User> GetByLogin(string user);
        public Task<User> GetById(int id);
    }
}
