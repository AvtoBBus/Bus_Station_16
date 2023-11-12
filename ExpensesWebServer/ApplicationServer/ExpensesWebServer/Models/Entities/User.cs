using System.Text.Json.Serialization;

namespace ExpensesWebServer.Models.Entities
{
    /*
     * Класс User является основной сущностью для внутренней бизнес-логики
     */
    public class User
    {
        // Поле Id является UID для User
        public int Id { get; set; }
        // Логин User'a является уникальным
        public string Login { get; set; }
        // Пароль пользователя. Требования: https://support.kaspersky.com/KPC/1.0/ru-RU/183862.html
        [JsonIgnore]
        public string Password { get; set; }
        public string Salt { get; set; }
        // Список трат содердится и обновляется с каждым месяцем.
        // 
        public List<Expense> Expenses { get; set; }
    }
}
