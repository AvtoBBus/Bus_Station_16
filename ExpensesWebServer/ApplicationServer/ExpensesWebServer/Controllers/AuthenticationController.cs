using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers;

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
    [Route("login/init")]
    public async Task<IActionResult> LoginInit(string login)
    /*
    * Метод нужен для передачи salt клиенту, чтобы он мог сгенерировать хэш пароля
    */
    {
        var user = await _userRepository.GetByLoginAsync(login);
        if (user == null)
        {
            _logger.LogWarning("Пользователь не найден.");
            return NotFound(login);
        }

        return Ok(user);
    }
    [HttpPost]
    [Route("login/confirm")]
    public async Task<IActionResult> LoginConfirm(UserDTO dto)
    /*
     * Метод принимает хэш пароля и проверяет данные на корректность
     * В случае верных данных возвращает jwt-cookies
     */
    {
        var user = await _userRepository.GetByLoginAsync(dto.Login);

        if (user == null)
        {
            _logger.LogWarning("Пользователь не найден.");
            return NotFound(dto);
        }

        if (user.UserPassword != dto.Password) return BadRequest("Неверный пароль");

        var token = _jwtService.generate(user.Id);
        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true
        });

        if (user.Email != null) return Ok(user.Email);
        else return Ok(string.Empty);
    }
    [HttpPost("logout")]
    public IActionResult Logout()
    /*
     * Отнимает у юзера jwt-cookies => лешает доступа
     */
    {
        try
        {
            Response.Cookies.Delete("jwt");
        }
        catch (Exception ex)
        {
            _logger.LogError($"Ошибка удаления JWT token\nСообщение: {ex.Message}");
            return BadRequest("Ошибка удаления JWT token");
        }
        return Ok();
    }
}
