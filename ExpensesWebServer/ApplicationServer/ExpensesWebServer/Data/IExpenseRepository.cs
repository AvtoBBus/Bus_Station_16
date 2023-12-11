using ExpensesWebServer.Models.Entities;

namespace ExpensesWebServer.Data
{
    public interface IExpenseRepository: IRepository<Expense>
    {
        public Task<List<Expense>> GetByLoginAsync(string login);
        public Task<List<Expense>> GetByIdAsync(int id);
        public Task<List<Expense>> GerRangeBetweenDatesById(int id, DateOnly start, DateOnly stop);
    }
}
