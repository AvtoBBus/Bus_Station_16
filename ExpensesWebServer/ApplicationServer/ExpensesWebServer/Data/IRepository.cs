namespace ExpensesWebServer.Data;

public interface IRepository<T>
{
    public Task<List<T>> GetListOfObjects();
    public Task<int> CreateAsync(T entity);
    public T Update(T entity);
    public void Delete(int id);
}
