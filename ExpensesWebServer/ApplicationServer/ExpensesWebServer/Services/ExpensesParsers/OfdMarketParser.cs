using ExpensesWebServer.Models.Entities;
using HtmlAgilityPack;

namespace ExpensesWebServer.Services.Parsers;

public class OfdMarketParser
{
    public static List<Expense> Parse(HtmlDocument receiptHtml)
    {
        var expenseList = new List<Expense>();

        var productNodes = receiptHtml.DocumentNode.SelectNodes("//div[contains(@class, 'check-product-name_mr_css_attr')]");

        if (productNodes != null)
        {
            var sc = new StringCategorizer();
            foreach (var productNode in productNodes)
            {
                var productName = productNode.InnerText.Trim();
                var priceNode = productNode.SelectSingleNode("following-sibling::div");
                var priceText = priceNode != null ? priceNode.InnerText.Trim() : string.Empty;

                var productPrice = DefaultParser.ConvertPriceToDecimal(priceText);
                expenseList.Add(new Expense()
                {
                    ExpenseDescription = productName,
                    Amount = productPrice,
                    CreationDate = DefaultParser.ParseDate(receiptHtml),
                    Category = sc.CategorizeString(productName)
                });
                
            }
        }

        return expenseList;
    }
}
