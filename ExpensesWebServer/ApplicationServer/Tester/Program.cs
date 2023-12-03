using CsvImportProcessorsLibrary;

var csv = SberbankCsvProcessor.ProcessXlsx(@"C:\Users\globa\Documents\c_hashtag\Bus_Station_16\ExpensesWebServer\ApplicationServer\ExamplesOfCsv\sber_income.xlsx");
Console.WriteLine(csv);