namespace ExpensesWebServer.Models.Entities
{
    /*
     * Класс Expense является полем User (основной сущности)
     * Expense пресдтавляет собой "трату" или "стастью расхода" финансов
     */
    public class Expense
    {
        // Поле Id является UID для Expense
        public Guid Id { get; set; }
        // Amount - величина траты в рублях
        public decimal Amount { get; set; }
        // CreationDate - дата, когда трата имела место быть
        public DateTime CreationDate { get; set; }
        // Type - тип траты
        public string? Type { get; set; }
    }
}
