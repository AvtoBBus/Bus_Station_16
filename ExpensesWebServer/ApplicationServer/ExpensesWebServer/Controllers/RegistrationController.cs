using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers;

/// <summary>
/// Контроллер для регистрации.
/// </summary>
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
    /// <summary>
    ///  Метод для инициализации нового юзера. Создает запись в бд с логином и генерирует соль.
    /// </summary>
    /// <param name="login">Логин для нового юзера</param>
    /// <returns>Соль</returns>
    [HttpPost]
    [Route("init")]
    public async Task<IActionResult> RegInit(string login)
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
        return Ok(vulnerableUser.Salt);
    }
    /// <summary>
    /// Сохраняет хэш пароля в бд
    /// </summary>
    /// <param name="dto">Kогин и хэш пароля</param>
    /// <returns></returns>
    [HttpPost]
    [Route("confirm")]
    public async Task<IActionResult> RegisterHas(UserDTO dto)
    {
        User vulnerableUser = await _userRepository.GetByLoginAsync(dto.Login);
        if (vulnerableUser == null) 
        {
            _logger.LogError("Пользователь не найден.\n");
            return NotFound(dto); 
        }
        vulnerableUser.UserPassword = dto.Password;

        _userRepository.Update(vulnerableUser);

        return Ok();
    }
}
