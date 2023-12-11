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
        public RegistrationController(ILogger<RegistrationController> logger, IUserRepository repository)
        {
            _logger = logger;
            _userRepository = repository;
        }
        [HttpPost]
        [Route("init")]
        public async Task<IActionResult> RegInit(string login)
        /*
         * Метод для инициализации нового юзера.
         * Создает запись в бд с логином и генерирует соль
         * Соль возвращает в клиент
         */
        {
            var vulnerableUser = new User
            {
                UserLogin = login,
                UserPassword = string.Empty,
                Salt = BCrypt.Net.BCrypt.GenerateSalt()
            };
            try
            {
                await _userRepository.CreateAsync(vulnerableUser);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Ошибка создания сущности пользователя.\nСообщение ошибки:{ex.Message}\n");
                return BadRequest($"Ошибка создания сущности пользователя.");
            }
            return Created("success",vulnerableUser.Salt);
        }
        [HttpPost]
        [Route("confirm")]
        public async Task<IActionResult> RegisterHas(UserDTO dto)
        /*
         * Метод принимает логин и хэш пароля
         * По завершении в бд есть юзер с логином, паролем и собственной солью
         */
        {
            User vulnerableUser = await _userRepository.GetByLoginAsync(dto.Login);
            if (vulnerableUser == null) 
            {
                _logger.LogError("Пользователь не найден.\n");
                return NotFound(dto); 
            }
            vulnerableUser.UserPassword = dto.Password;

            _userRepository.Update(vulnerableUser);

            return Ok("success");
        }
    }
}
