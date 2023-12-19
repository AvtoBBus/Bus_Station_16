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
        [HttpPost]
        [Route("getAllBetweenDates")]
        public async Task<IActionResult> GetAllBetweenDates(DatesDTO dto)
        {
            var verifiedJWT = _jwtService.JwtSecurityToken(Request);
            if (verifiedJWT == null)
            {
                _logger.LogWarning("JWT was not found");
                return Unauthorized();
            }
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
            return Ok(await _expenseReposirity.GetRangeBetweenDatesById(
                                userId,
                                DateOnly.Parse(dto.StartDate),
                                DateOnly.Parse(dto.StopDate)));
        }
        [HttpGet]
        [Route("getAll")]
        public async Task<IActionResult> GetAllExpenses()
        {
            var verifiedJWT = _jwtService.JwtSecurityToken(Request);
            if (verifiedJWT == null)
            {
                _logger.LogWarning("JWT was not found");
                return Unauthorized();
            }
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
        public async Task<IActionResult> Add(Expense obj)
        {
            var verifiedJWT = _jwtService.JwtSecurityToken(Request);
            if (verifiedJWT == null)
            {
                _logger.LogWarning("JWT was not found");
                return Unauthorized();
            }

            try
            {
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
        [Route("delete/{id}")]
        public IActionResult Delete(int id)
        {
            var verifiedJWT = _jwtService.JwtSecurityToken(Request);
            if (verifiedJWT == null)
            {
                _logger.LogWarning("JWT was not found");
                return Unauthorized();
            }

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
        [Route("update")]
        public IActionResult Update(Expense obj)
        {
            var verifiedJWT = _jwtService.JwtSecurityToken(Request);
            if (verifiedJWT == null)
            {
                _logger.LogWarning("JWT was not found");
                return Unauthorized();
            }

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
    }

}
