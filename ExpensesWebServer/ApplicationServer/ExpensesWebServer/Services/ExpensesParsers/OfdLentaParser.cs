using ExpensesWebServer.Models.Entities;
using HtmlAgilityPack;

namespace ExpensesWebServer.Services.Parsers;

public class OfdLentaParser
{
    public static List<Expense> Parse(HtmlDocument receiptHtml)
    {
        var expenseList = new List<Expense>();

        var divsWithFiveTables = receiptHtml.DocumentNode.SelectNodes("//div[count(.//table)=5]");
        if(divsWithFiveTables == null) return expenseList;  
        foreach (var div in divsWithFiveTables)
        {
            var tdNodes = div.Elements("table").ToList();

            var sc = new StringCategorizer();

            expenseList.Add(new Expense()
            {
                ExpenseDescription = tdNodes[0].InnerText,
                Amount = DefaultParser.ConvertPriceToDecimal(tdNodes[1].InnerText),
                CreationDate = DefaultParser.ParseDate(receiptHtml),
                Category = sc.CategorizeString(tdNodes[0].InnerText)
            });
        }

        return expenseList;
    }
}
