using System.ComponentModel.DataAnnotations;

namespace ExpensesWebServer.Models.DTOs
{
    public class ExpenseDTO
    {
        //Описание 
        public string ExpenseDescription { get; set; }
        // Amount - величина траты в рублях
        public decimal Amount { get; set; }
        // CreationDate - дата, когда трата имела место быть
        public DateTime CreationDate { get; set; }
        // Category - тип траты
        public int Category { get; set; }
    }
}

