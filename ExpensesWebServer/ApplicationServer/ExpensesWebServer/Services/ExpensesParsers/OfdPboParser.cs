using ExpensesWebServer.Models.Entities;
using HtmlAgilityPack;

namespace ExpensesWebServer.Services.Parsers
{
    public static class OfdPboParser
    {
        public static List<Expense> Parse(HtmlDocument receiptHtml)
        {
            var expenseList = new List<Expense>();

            var trNodesWithFiveTds = receiptHtml.DocumentNode.SelectNodes("//tr[count(td)=5]"); // All lines with goods

            if(trNodesWithFiveTds == null) return expenseList;

            trNodesWithFiveTds.Remove(0); // Remove header

            if (trNodesWithFiveTds != null)
            {
                foreach (var trNode in trNodesWithFiveTds)
                {
                    var tdNodes = trNode.Elements("td").ToList();

                    var sc = new StringCategorizer();

                    expenseList.Add(new Expense()
                    {
                        ExpenseDescription = tdNodes[1].InnerText,
                        Amount = decimal.Parse(tdNodes[4].InnerText),
                        CreationDate = DefaultParser.ParseDate(receiptHtml),
                        Category = sc.CategorizeString(tdNodes[1].InnerText)
                    });
                }
            }

            return expenseList;
        }
    }
}
