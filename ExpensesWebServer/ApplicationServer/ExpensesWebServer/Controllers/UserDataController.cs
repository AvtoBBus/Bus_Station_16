using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
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
            ILogger<UserDataController> logger,
            IExpenseRepository expensesRepository,
            JWTService jwtService)
        {
            _logger = logger;
            _expenseReposirity = expensesRepository;
            _jwtService = jwtService;
        }
        private JwtSecurityToken? JwtSecurityToken()
        {
            JwtSecurityToken verifiedJWT;
            var jwt = Request.Cookies["jwt"];
            if (jwt == null)
            {
                _logger.LogError($"Error reading jwt\nMessage: jwt not found in cookies\n");
                return null;
            }
            verifiedJWT = _jwtService.verify(jwt);
            return verifiedJWT;
        }
        [HttpPost]
        [Route("getAllBetweenDates")]
        public async Task<IActionResult> GetAllBetweenDates(DatesDTO dto)
        {
            var verifiedJWT = JwtSecurityToken();
            if (verifiedJWT == null) return Unauthorized();
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
            return Ok(await _expenseReposirity.GerRangeBetweenDatesById(
                                userId,
                                DateOnly.Parse(dto.StartDate),
                                DateOnly.Parse(dto.StopDate)));
        }
        [HttpGet]
        [Route("getAll")]
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
        [Route("add")]
        public async Task<IActionResult> Add(ExpenseDTO dto)
        {
            var verifiedJWT = JwtSecurityToken();
            if (verifiedJWT == null) return Unauthorized();

            var expense = new Expense
            {
                UserId = int.Parse(verifiedJWT.Issuer),
                ExpenseDescription = dto.ExpenseDescription,
                Amount = dto.Amount,
                CreationDate = dto.CreationDate,
                Category = dto.Category
            };
            try
            {
                await _expenseReposirity.CreateAsync(expense);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ошибка создания  записи траты\nСообщение:{ex.Message}");
                return BadRequest("Ошибка создания  записи траты");
            }
            return Ok(expense);
        }
        [HttpPost]
        [Route("delete/{id}")]
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
        [HttpPost]
        [Route("update/{id}")]
        public IActionResult Update(int id, ExpenseDTO dto)
        {
            var verifiedJWT = JwtSecurityToken();
            if (verifiedJWT == null) return Unauthorized();

            var expense = new Expense
            {
                Id = id,
                UserId = int.Parse(verifiedJWT.Issuer),
                ExpenseDescription = dto.ExpenseDescription,
                Amount = dto.Amount,
                CreationDate = dto.CreationDate,
                Category = dto.Category
            };
            try
            {
                _expenseReposirity.Update(expense);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Ошибка обновления записи траты\nСообщение:{ex.Message}");
                return BadRequest("Ошибка обновления  записи траты");
            }
            return Ok(dto);
        }
    }

}
