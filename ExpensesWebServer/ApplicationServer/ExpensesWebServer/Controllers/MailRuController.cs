using ExpensesWebServer.Data;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers;

/// <summary>
/// Cotnroller to interact with app's Email interface
/// </summary>
public class MailRuController : Controller
{
    private ILogger _logger; // Логгер в stdout
    private JWTService _jwtService; // Сервис для работы с JWT
    private IUserRepository _userRepository; // Интерфейс бд для работы с юзерами
    private IExpenseRepository _expenseRepository; // Интерфейс бд для работы с тратами
    public MailRuController(
        ILogger<UserDataController> logger,
        IUserRepository userRepository,
        IExpenseRepository expenseRepository,
        JWTService jwtService)
    {
        _logger = logger;
        _userRepository = userRepository;
        _expenseRepository = expenseRepository;
        _jwtService = jwtService;
    }
    /// <summary>
    /// Sets email
    /// </summary>
    /// <param name="email">Email</param>
    /// <returns></returns>
    [HttpPost]
    [Route("setEmail")]
    public async Task<IActionResult> SetEmail(string email)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }

        var user = await _userRepository.GetByIdAsync(int.Parse(verifiedJWT.Issuer));
        user.Email = email;
        _userRepository.Update(user);

        return Ok();
    }
    /// <summary>
    /// Initialize fetching expenses from mail
    /// </summary>
    /// <returns>Number of fetched expenses</returns>
    [HttpGet]
    [Route("fetchExpensesFromMail")]
    public async Task<IActionResult> FetchExpensesFromMail()
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }
        int userId;
        if (!int.TryParse(verifiedJWT.Issuer, out userId))
        {
            _logger.LogError("Error parsing issuer");
            return BadRequest("Error parsing issuer");
        }

        var user = await _userRepository.GetByIdAsync(userId);
        if (user.Email == null) return BadRequest("Email is not set. Operation is not available.");

        var mailProvider = new EmailReceiptsProvider();
        List<Expense> expenses;
        try
        {
            expenses = mailProvider.FetchReceitps(user.Email);
        }
        catch(Exception ex) 
        {
            _logger.LogError($"Error fetching from mail.\nMessage:{ex.Message}\nUserId:{userId}");
            return new StatusCodeResult(StatusCodes.Status500InternalServerError);
        }
        foreach (var expense in expenses) expense.UserId = userId;

        return Ok(await _expenseRepository.AddRangeAsync(expenses));
    }
}
