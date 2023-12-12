using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ExpensesWebServer.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("testController")]
    public class testController : Controller
    {

        [HttpPost("UploadFile")]
        public IActionResult UploadFile(IFormFile formFile)
        {
            Console.WriteLine("UploadFile" + formFile.FileName);
            return Ok(formFile.FileName);
        }
    }
}
