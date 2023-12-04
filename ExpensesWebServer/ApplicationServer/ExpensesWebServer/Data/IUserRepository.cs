using ExpensesWebServer.Models.Entities;

namespace ExpensesWebServer.Data
{
    public interface IUserRepository: IRepository<User>
    {
        public Task<User> GetByLoginAsync(string login);
        public Task<User> GetByIdAsync(int id);
    }
}
