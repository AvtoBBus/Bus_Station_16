using System.ComponentModel.DataAnnotations;

namespace ExpensesWebServer.Data.DAL
{
    public record ExpenseFromCsv(string ExpenseDescription, decimal Amount ,DateTime CreationDate ,int Category);
    /*public class ExpenseFromCsv
    {
        //Описание 
        public string ExpenseDescription { get; set; }
        // Amount - величина траты в рублях
        public decimal Amount { get; set; }
        // CreationDate - дата, когда трата имела место быть
        public DateTime CreationDate { get; set; }
        // Category - тип траты
        public int Category { get; set; }
    }*/
}
