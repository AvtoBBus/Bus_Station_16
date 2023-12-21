using ExpensesWebServer.Models.Entities;

namespace ExpensesWebServer.Data;

public interface IExpenseRepository: IRepository<Expense>
{
    public Task<List<Expense>> GetByLoginAsync(string login);
    public Task<List<Expense>> GetByIdAsync(int id);
    public Task<List<Expense>> GetRangeBetweenDatesById(int id, DateOnly start, DateOnly stop);
    public Task<int> AddRangeAsync(List<Expense> entites);
}
