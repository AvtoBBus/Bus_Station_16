using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers
{
    /*
     * Контроллер для регистрации.
     * Используется JWT-cookie с флагом http only.
     */
    [Route("reg")]
    [ApiController]
    public class RegistrationController : Controller
    {
        private ILogger _logger; // Логгер в stdout
        private IUserRepository _userRepository; // Интерфейс бд для работы с пользователем
        public RegistrationController(ILogger<AuthenticationController> logger, IUserRepository repository)
        {
            _logger = logger;
            _userRepository = repository;
        }
        // Endpoint для регитсрации
        /*[HttpPost]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            var user = new User
            {
                Login = dto.Login,
                Password = Crypto.HashPassword(dto.Password),
                Expenses = new List<Expense>()
            };
            await _userRepository.CreateAsync(user);
            return Created("success", user);
        }*/
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> RegisterLogin(RegisterDTO dto)
        {
            var vulnerableUser = new User
            {
                Login = dto.Login,
                Password = string.Empty,
                Salt = BCrypt.Net.BCrypt.GenerateSalt(),
                Expenses = new List<Expense>()
            };
            await _userRepository.CreateAsync(vulnerableUser);
            return Created("success", vulnerableUser);
        }
        [HttpPost]
        [Route("hashPassword")]
        public async Task<IActionResult> RegisterHas(RegisterDTO dto)
        {
            var vulnerableUser = await _userRepository.GetByLoginAsync(dto.Login);
            if (vulnerableUser == null) 
            {
                _logger.LogError("При добавлении хэша ,при регитсрации, не был найден логин в базе");
                return NotFound(dto); 
            }
            vulnerableUser.Password = dto.Password;

            return Created("success", vulnerableUser);
        }
    }
}
