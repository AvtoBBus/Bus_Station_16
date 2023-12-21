using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ExpensesWebServer.Models.Entities;

/// <summary>
/// User entity
/// </summary>
public class User
{
    // Поле Id является UID для User
    [Required]
    [Key]
    public int Id { get; set; }
    /// <summary>
    /// Login. Unique.
    /// </summary>
    [Required]
    public string UserLogin { get; set; }
    /// <summary>
    /// Email address. Unique. Not required
    /// </summary>
    [JsonIgnore]
    public string? Email {get;set;}
    /// <summary>
    /// Password (hash)
    /// Requirements: https://support.kaspersky.com/KPC/1.0/ru-RU/183862.html
    /// </summary>
    [Required]
    [JsonIgnore]
    public string UserPassword { get; set; }
    /// <summary>
    /// Salt
    /// </summary>
    [Required]
    public string Salt { get; set; }
    // Список трат содердится и обновляется с каждым месяцем.
}
