using ExpensesWebServer.Data;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers
{
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

            return Ok(user);
        }
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

            var user = await _userRepository.GetByIdAsync(int.Parse(verifiedJWT.Issuer));
            if (user.Email == null) return BadRequest("Email is not set");

            var mailProvider = new EmailReceiptsProvider();
            var expenses = mailProvider.FetchReceitps(user.Email);
            foreach (var expense in expenses) expense.UserId = int.Parse(verifiedJWT.Issuer);

            return Ok(await _expenseRepository.AddRangeAsync(expenses));
        }
    }
}
