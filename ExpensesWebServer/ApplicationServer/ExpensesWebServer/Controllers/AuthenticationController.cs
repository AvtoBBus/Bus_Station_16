using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers
{
    /*
     * Контроллер для аутентификации и авторизации пользователя.
     * Используется JWT-cookie с флагом http only.
     */
    [Route("auth")]
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
        [Route("login/login")]
        public async Task<IActionResult> LoginLogin(string login)
        {
            var user = await _userRepository.GetByLoginAsync(login);
            if (user == null) return BadRequest(new { message = "Wrong login" });

            return Ok(user);
        }
        [HttpPost]
        [Route("login/hashPassword")]
        public async Task<IActionResult> LoginHashPassword(LoginDTO dto)
        {
            var user = await _userRepository.GetByLoginAsync(dto.Login);

            if (user == null) return BadRequest(new { message = "Wrong login" });
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password)) return BadRequest(new { message = "Wrong password" });

            var token = _jwtService.generate(user.Id);
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(new { message = "success" });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success"});
        }
    }
}
