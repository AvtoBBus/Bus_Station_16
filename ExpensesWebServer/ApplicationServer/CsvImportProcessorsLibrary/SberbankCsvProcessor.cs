using ExpensesWebServer.Data.DAL;
using OfficeOpenXml;

namespace CsvImportProcessorsLibrary
{
    public static class SberbankCsvProcessor
    {
        static SberbankCsvProcessor()
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }
        public static List<ExpenseFromCsv> ProcessXlsx(string filepath)
        {
            using (var xlPackage = new ExcelPackage(
                new FileInfo(filepath)))
            {
                var myWorksheet = xlPackage.Workbook.Worksheets.First(); //select sheet here
                var totalRows = myWorksheet.Dimension.End.Row;
                var totalColumns = myWorksheet.Dimension.End.Column;

                var expensesFromCsv = new List<ExpenseFromCsv>();
                for (int rowNum = 2; rowNum <= totalRows; rowNum++) //select starting row here
                {
                    var row = myWorksheet.Cells[rowNum, 1, rowNum, totalColumns].Select(c => c.Value == null ? string.Empty : c.Value.ToString());
                    if (row is null) return expensesFromCsv;
                    expensesFromCsv.Add(
                        new ExpenseFromCsv(
                            row.ElementAt(7) ?? string.Empty,
                            decimal.Parse(row.ElementAt(6) ?? "0"),
                            DateTime.Parse(row.ElementAt(1) ?? "1970.1.1"),
                            0
                            )
                        );
                }
                return expensesFromCsv;
            }
        }
    }
}