namespace ExpensesWebServer.Models.Entities
{
    /*
     * Класс User является основной сущностью для внутренней бизнес-логики
     */
    public class User
    {
        // Поле Id является UID для User
        public Guid Id { get; set; }
        // Логин User'a является уникальным
        public byte Login { get; set; }
        // Пароль пользователя. Требования: https://support.kaspersky.com/KPC/1.0/ru-RU/183862.htm
        public byte Password { get; set; }
        // Список трат содердится и обновляется с каждым месяцем.
        // 
        public List<Expense> Expenses { get; set; }
    }
}
