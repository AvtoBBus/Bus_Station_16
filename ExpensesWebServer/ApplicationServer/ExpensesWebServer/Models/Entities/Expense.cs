using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpensesWebServer.Models.Entities;
/// <summary>
/// The Expense entity
/// </summary>
public class Expense
{
    /// <summary>
    /// Unique, primary key
    /// </summary>
    [Required]
    public int Id { get; set; }
    /// <summary>
    /// Relation to exact user
    /// </summary>
    [Required]
    public int UserId {  get; set; }
    [Required]
    public string ExpenseDescription { get; set; }
    /// <summary>
    /// Summ of the expense. Rubles
    /// </summary>
    [Required]
    [Column(TypeName = "decimal(18,4)")]
    public decimal Amount { get; set; }
    public DateOnly CreationDate { get; set; }
    [Required]
    public Categories Category { get; set; }
}

