using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ExpensesWebServer.Models.Entities
{
    /*
     * Класс User является основной сущностью для внутренней бизнес-логики
     */
    public class User
    {

        // Поле Id является UID для User
        [Required]
        [Key]
        public int Id { get; set; }
        // Логин User'a является уникальным
        [Required]
        public string UserLogin { get; set; }
        // Пароль пользователя. Требования: https://support.kaspersky.com/KPC/1.0/ru-RU/183862.html
        [Required]
        [JsonIgnore]
        public string UserPassword { get; set; }
        [Required]
        public string Salt { get; set; }
        // Список трат содердится и обновляется с каждым месяцем.
    }
}
