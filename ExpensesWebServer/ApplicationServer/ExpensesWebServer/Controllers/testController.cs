using Microsoft.AspNetCore.Mvc;

namespace ExpensesWebServer.Controllers
{
    [ApiController]
    [Route("testController")]
    public class testController : Controller
    {

        [HttpGet]
        [Route("testEndpoint")]
        public IActionResult testEndpoint() => Ok("Тут какой-то текст, можешь попробовать его вытащить");
    }
}
