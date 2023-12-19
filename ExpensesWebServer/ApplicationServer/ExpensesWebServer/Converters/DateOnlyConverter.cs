using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
namespace ExpensesWebServer.Converters;
/// <summary>
/// DateTime to DateOnly converter
/// </summary>
public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
{
    public DateOnlyConverter()
        : base(dateOnly =>
                dateOnly.ToDateTime(TimeOnly.MinValue),
            dateTime => DateOnly.FromDateTime(dateTime))
    { }
}
