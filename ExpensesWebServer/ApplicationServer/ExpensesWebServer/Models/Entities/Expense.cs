using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpensesWebServer.Models.Entities
{
    /*
     * Класс Expense является полем User (основной сущности)
     * Expense пресдтавляет собой "трату" или "стастью расхода" финансов
     */
    public class Expense
    {
        // Поле Id является UID для Expense
        [Required]
        public int Id { get; set; }
        // Поле UserId является привязкой к конкретному пользователю
        [Required]
        public int UserId {  get; set; }
        //Описание 
        [Required]
        public string ExpenseDescription { get; set; }
        // Amount - величина траты в рублях
        [Required]
        [Column(TypeName = "decimal(18,4)")]
        public decimal Amount { get; set; }
        // CreationDate - дата, когда трата имела место быть
        public DateTime CreationDate { get; set; }
        // Category - тип траты
        [Required]
        public int Category { get; set; }
    }
}
