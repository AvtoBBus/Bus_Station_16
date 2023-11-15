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
    [Route("registration")]
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
        [HttpPost]
        [Route("reg/init")]
        public async Task<IActionResult> LoginInit(string login)
        /*
         * Метод для инициализации нового юзера.
         * Создает запись в бд с логином и генерирует соль
         * Соль возвращает в клиент
         */
        {
            var vulnerableUser = new User
            {
                Login = login,
                Password = string.Empty,
                Salt = BCrypt.Net.BCrypt.GenerateSalt(),
                Expenses = new List<Expense>()
            };
            try
            {
                await _userRepository.CreateAsync(vulnerableUser);
            }
            catch(Exception ex)
            {
                _logger.LogError($"Ошибка создания сущности пользователя.\nСообщение ошибки:{ex.Message}\n");
                throw ex;
            }
            return Created("success", vulnerableUser);
        }
        [HttpPost]
        [Route("reg/confirm")]
        public async Task<IActionResult> RegisterHas(LPDTO dto)
        /*
         * Метод принимает логин и хэш пароля
         * По завершении в бд есть юзер с логином, паролем и собственной солью
         */
        {
            var vulnerableUser = await _userRepository.GetByLoginAsync(dto.Login);
            if (vulnerableUser == null) 
            {
                _logger.LogError("Пользователь не найден.\n");
                return NotFound(dto); 
            }
            vulnerableUser.Password = dto.Password;

            return Created("success", vulnerableUser);
        }
    }
}
