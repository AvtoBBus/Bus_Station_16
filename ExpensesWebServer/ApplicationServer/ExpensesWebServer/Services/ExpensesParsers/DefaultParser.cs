using System.Text.RegularExpressions;
using HtmlAgilityPack;
using System.Globalization;
namespace ExpensesWebServer.Services.Parsers;
public static class DefaultParser
{
    private static Regex _amountRegex = new(@"(?<!\d)(\d+[\.,]\d{2})(?!(\.\d{2}|,\d{2}))");
    private static Regex _dateRegex = new(@"\b\d{2}[-/.]\d{2}[-/.]\d{4}\b");
    private static decimal? ParseAfterItog(string data)
    {
        decimal result;

        var startIndex = data.IndexOf("ИТОГ", StringComparison.OrdinalIgnoreCase);
        var substring = data.Substring(startIndex);

        var match = _amountRegex.Match(substring);
        var value = match.Value.Replace(',','.');

        if(Decimal.TryParse(value, NumberStyles.Number, CultureInfo.InvariantCulture, out result)) return result;
        return null;
    }
    public static decimal ConvertPriceToDecimal(string priceText)
    {
        // Remove currency symbol and any other non-numeric characters, except decimal separator
        var processedPrice = System.Text.RegularExpressions.Regex.Match(priceText, @"\d+[,.]\d{2}").Value;

        // Assuming the price uses '.' as the decimal separator. If not, replace '.' with the correct separator
        processedPrice = processedPrice.Replace(",", CultureInfo.InvariantCulture.NumberFormat.NumberDecimalSeparator);

        return decimal.Parse(processedPrice, NumberStyles.Any, CultureInfo.InvariantCulture);
    }
    public static decimal Parse(HtmlDocument receiptHtml)
    {
        var guesses = new List<decimal?>();

        var trNodes = receiptHtml.DocumentNode.SelectNodes("//tr[td]"); // все <tr>, содержащие <td>

        if (trNodes == null) throw new Exception("Could not fetch any info from given receipt");

        foreach (var trNode in trNodes)
        {
            if (trNode.InnerText.Contains("ИТОГ", StringComparison.OrdinalIgnoreCase)) // tr node с ИТОГ внутри
            {
                var tdNodes = trNode.SelectNodes("td");
                var tdIt = tdNodes.AsEnumerable().GetEnumerator();

                while (tdIt.MoveNext())
                {
                    if (tdIt.Current.InnerText.Contains("ИТОГ", StringComparison.OrdinalIgnoreCase))
                    {
                        guesses.Add(ParseAfterItog(tdIt.Current.InnerText));
                    }
                }
            }
        }
        return guesses.Max() ?? throw new Exception("Could not fetch any info from given receipt");
    }
    public static DateOnly ParseDate(HtmlDocument receiptHtml)
    {
        var match = _dateRegex.Match(receiptHtml.Text);
        return DateOnly.Parse(match.Value);
    }
}
