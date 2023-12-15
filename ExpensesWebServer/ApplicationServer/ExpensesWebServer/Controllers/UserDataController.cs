using ExpensesWebServer.Data;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ExpensesWebServer.Controllers
{
    [ApiController]
    [Route("userData")]
    public class UserDataController : Controller
    {
        private ILogger _logger; // Логгер в stdout
        private JWTService _jwtService; // Сервис для работы с JWT
        private IExpenseRepository _expenseReposirity; // Интерфейс бд для работы с тратами
        public UserDataController(
            ILogger<AuthenticationController> logger,
            IExpenseRepository expensesRepository,
            JWTService jwtService)
        {
            _logger = logger;
            _expenseReposirity = expensesRepository;
            _jwtService = jwtService;
        }
        private string formatDate(DateTime date) => date.ToString("yyyy-MM-dd HH:mm");
        private JwtSecurityToken? JwtSecurityToken()
        {
            JwtSecurityToken verifiedJWT;
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt is null) throw new NullReferenceException("JWT was null");
                verifiedJWT = _jwtService.verify(jwt);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error reading jwt\nMessage:{ex.Message}\n");
                return null;
            }
            return verifiedJWT;
        }
        [HttpGet]
        [Route("[controller]/getAll")]
        public async Task<IActionResult> GetAllExpenses()
        {
            var verifiedJWT = JwtSecurityToken();
            if(verifiedJWT == null) return Unauthorized();
            int userId;
            try
            {
                userId = int.Parse(verifiedJWT.Issuer);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error parsing issuer\nMessage:{ex.Message}\n");
                throw;
            }

            return Ok(await _expenseReposirity.GetByIdAsync(userId));
        }
        [HttpPost]
        [Route("[controller]/update/{id}")]
        public IActionResult Update(Expense obj)
        {
            var verifiedJWT = JwtSecurityToken();
            if (verifiedJWT == null) return Unauthorized();
            try 
            {
                _expenseReposirity.Update(obj);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ошибка обновления записи траты\nСообщение:{ex.Message}");
                return BadRequest("Ошибка обновления  записи траты");
            }
            return Ok(obj);
        }
        [HttpPost]
        [Route("[controller]/add")]
        public async Task<IActionResult> Add(Expense obj)
        {
            var verifiedJWT = JwtSecurityToken();
            if (verifiedJWT == null) return Unauthorized();
            try
            {
                obj.UserId = int.Parse(verifiedJWT.Issuer);
                await _expenseReposirity.CreateAsync(obj);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ошибка создания  записи траты\nСообщение:{ex.Message}");
                return BadRequest("Ошибка создания  записи траты");
            }
            return Ok(obj);
        }
        [HttpPost]
        [Route("[controller]/delete/{id}")]
        public IActionResult Delete(int id)
        {
            var verifiedJWT = JwtSecurityToken();
            if (verifiedJWT == null) return Unauthorized();

            try
            {
                _expenseReposirity.Delete(id);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ошибка удаления  записи траты\nСообщение:{ex.Message}");
                return BadRequest("Ошибка удаления  записи траты");
            }
            return NoContent();
        }
    }
}
