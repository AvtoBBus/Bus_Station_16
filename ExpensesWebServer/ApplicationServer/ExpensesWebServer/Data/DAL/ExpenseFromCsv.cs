namespace ExpensesWebServer.Data.DAL;

public record ExpenseFromCsv(string ExpenseDescription, decimal Amount ,DateTime CreationDate ,int Category);
