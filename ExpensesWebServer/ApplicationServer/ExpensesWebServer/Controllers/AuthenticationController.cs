using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers
{
    /*
     * Контроллер для аутентификации и авторизации пользователя.
     * Используется JWT-cookie с флагом http only.
     */
    [Route("authentication")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private ILogger _logger; // Логгер в stdout
        private JWTService _jwtService; // Сервис для работы с JWT
        private IUserRepository _userRepository; // Интерфейс бд для работы с пользователем
        public AuthenticationController(ILogger<AuthenticationController> logger, IUserRepository repository, JWTService jwtService) 
        { 
            _logger = logger;   
            _userRepository = repository;
            _jwtService = jwtService;
        }
        [HttpPost]
        [Route("login/init")]
        public async Task<IActionResult> LoginInit(string login)
        /*
        * Метод нужен для передачи salt клиенту, чтобы он мог сгенерировать хэш пароля
        */
        {
            var user = await _userRepository.GetByLoginAsync(login);
            if (user == null) return BadRequest(new { message = "Wrong login" });

            return Ok(user);
        }
        [HttpPost]
        [Route("login/confirm")]
        public async Task<IActionResult> LoginInit(LPDTO dto)
        /*
         * Метод принимает хэш пароля и проверяет данные на корректность
         * В случае верных данных возвращает jwt-cookies
         */
        {
            var user = await _userRepository.GetByLoginAsync(dto.Login);

            if (user == null) return BadRequest(new { message = "Login not found" });

            if (user.Password != dto.Password) return BadRequest(new { message = "Wrong password" });

            var token = _jwtService.generate(user.Id);
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new { message = "success" });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        /*
         * Отнимает у юзера jwt-cookies => лешает доступа
         */
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success"});
        }
    }
}
