using ExpensesWebServer.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Linq;

namespace ExpensesWebServer.Data
{
    public class ExpeseRepository: IExpenseRepository
    {

        private Context _context;
        public ExpeseRepository(Context context)
        {
            _context = context;
        }

        public async Task<int> CreateAsync(Expense entity)
        {
            await _context.Expenses.AddAsync(entity);
            return _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var entity = _context.Expenses.FirstOrDefault(ex => ex.Id == id);
            if (entity == null) throw new ArgumentException($"Expense with id =={id} not found");
            _context.Expenses.Remove(entity);
            _context.SaveChanges();
        }

        public async Task<List<Expense>> GetByIdAsync(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync<User>(u => u.Id == id);
            if (user == null) throw new ArgumentException($"Expense, related to User with id=={id} not found");
            return _context.Expenses.Where(ex => ex.UserId == user.Id).ToList();
        }

        public async Task<List<Expense>> GetByLoginAsync(string login)
        {
            var user = await _context.Users.FirstOrDefaultAsync<User>(u => u.UserLogin == login);
            if (user == null) throw new ArgumentException($"Expense, related to User with login=={login} not found");
            return _context.Expenses.Where(ex => ex.UserId == user.Id).ToList();
        }

        public Task<List<Expense>> GetListOfObjects() => _context.Expenses.ToListAsync();

        public async Task<List<Expense>> GerRangeBetweenDatesById(int id, DateOnly start, DateOnly stop)
        {
            List<Expense> expenses;
            var test = _context.Expenses.First().CreationDate;
            if (start.ToShortDateString() == stop.ToShortDateString())
            {
                  expenses = await _context.Expenses.Where(expense => expense.CreationDate == start && expense.UserId == id).ToListAsync();
            }
            else
            {
                  expenses = await _context.Expenses.Where(
                    expense =>
                    expense.CreationDate >= start
                    && expense.CreationDate <= stop
                    && expense.UserId == id).ToListAsync();
            }
            return expenses;
        }

        public Expense Update(Expense entity)
        {
            var dbEntity = _context.Expenses.FirstOrDefault(ex => ex.Id == entity.Id);
            if (dbEntity == null) throw new ArgumentException($"Expense with id =={entity.Id} not found");
            _context.Expenses.Update(entity);
            _context.SaveChanges();
            return entity;
        }
    }
}
