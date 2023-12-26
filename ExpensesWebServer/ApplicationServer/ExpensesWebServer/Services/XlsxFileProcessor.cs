using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services.Parsers;
using Microsoft.AspNetCore.Http;
using OfficeOpenXml;
using System.Globalization;

namespace ExpensesWebServer.Services;

public class XlsxFileProcessor
{
    private StringCategorizer _categorizer = new();
    private string _dateFormat = "dd MMMM yyyy, HH:mm"; // Format for the date part
    static XlsxFileProcessor()
    {
        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
    }
    public List<Expense> ProcessXlsx(ExcelPackage File)
    {
        using (File)
        {
            var myWorksheet = File.Workbook.Worksheets.First(); //select sheet here
            var totalRows = myWorksheet.Dimension.End.Row;
            var totalColumns = myWorksheet.Dimension.End.Column;

            var expensesFromCsv = new List<Expense>();
            for (var rowNum = 2; rowNum <= totalRows; rowNum++) //select starting row here
            {
                var row = myWorksheet.Cells[rowNum, 1, rowNum, totalColumns].Select(c => c.Value == null ? string.Empty : c.Value.ToString());
                if (row is null) return expensesFromCsv;
                var dateTime = DateTime.ParseExact(row.ElementAt(1) ?? "1970.1.1", _dateFormat, new CultureInfo("ru-RU"));
                var dateOnly = DateOnly.FromDateTime(dateTime);
                expensesFromCsv.Add(
                    new Expense()
                    {
                        Id = 0,
                        UserId = 0,
                        ExpenseDescription = row.ElementAt(7) ?? string.Empty,
                        Amount = decimal.Parse(row.ElementAt(6) ?? "0"),
                        CreationDate = dateOnly,
                        Category = _categorizer.CategorizeString(row.ElementAt(3))
                    }
                    );
            }
            return expensesFromCsv;
        }
    }
}
