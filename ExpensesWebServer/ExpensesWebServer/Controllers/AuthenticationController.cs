using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers
{
    [Route("authentication")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        //private ILogger _logger;
        private JWTService _jwtService;
        private IUserRepository _userRepository;
        public AuthenticationController(IUserRepository repository, JWTService jwtService) 
        { 
            //_logger = logger;   
            _userRepository = repository;
            _jwtService = jwtService;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterDTO dto)
        {
            var user = new User
            {
                Login = dto.Login,
                Password = Crypto.HashPassword(dto.Password),
                Expenses = new List<Expense>()
            };
            await _userRepository.Create(user);
            return Created("success", user);
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            var user = await _userRepository.GetByLogin(dto.Login);
            if(user == null) return BadRequest(new { message = "Wrong login"});

            if(!BCrypt.Net.BCrypt.Verify(dto.Password,user.Password)) return BadRequest(new { message = "Wrong password" });

            var token = _jwtService.generate(user.Id);
            Response.Cookies.Append("jwt", token, new CookieOptions {
                HttpOnly = true
            });

            return Ok(new { message="success"});
        }
        [HttpGet("user")]
        public IActionResult UserData()
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.verify(jwt);
                int userId = int.Parse(token.Issuer);
                var user = _userRepository.GetById(userId);
                return Ok(user);
            }
            catch(Exception ex)
            {
                //_logger.LogError(ex.Message);
                return Unauthorized();
            }
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok(new { message = "success"});
        }
    }
}
