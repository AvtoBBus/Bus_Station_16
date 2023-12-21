using ExpensesWebServer.Models.Entities;

namespace ExpensesWebServer.Services.Parsers;

public class StringCategorizer
{
    private Dictionary<string, string> _categoryKeywords;
    private Dictionary<string, Categories> _categoryType;

    public StringCategorizer()
    {
        _categoryKeywords = new Dictionary<string, string>
        {
            {"продукты питания", "еда, молоко, хлеб, фрукт, овощ, наггет, чикен, чикен хит, капучино, соус, картоф"},
            {"транспорт", "автомобиль, поезд, самолет, автобус, велосипед"},
            {"жилье", "дом, квартира, аренда, ипотека, недвижимость"},
            {"развлечения и досуг", "кино, театр, музей, парк, концерт, наушники, свзять, услуг связи"},
            {"здоровье и медицина", "больница, лекарство, врач, аптека, здоровье, Т/бумага, З/паста, пакеты д/мусора"}
        };
        _categoryType = new Dictionary<string, Categories>
        {
            { "продукты питания", Categories.Food},
            { "транспорт",Categories.Transport},
            { "жилье",Categories.Accomondation},
            { "развлечения и досуг", Categories.EnterpriseAndLeisure},
            { "здоровье и медицина", Categories.HealthAndMedicine}
        };
    }

    public Categories CategorizeString(string input)
    {
        foreach (var category in _categoryKeywords)
        {
            var keywords = category.Value.Split(',');
            foreach (var keyword in keywords)
            {
                if (input.Contains(keyword.Trim(), StringComparison.InvariantCultureIgnoreCase))
                {
                    return _categoryType[category.Key];
                }
            }
        }
        return Categories.Etc;
    }
}
