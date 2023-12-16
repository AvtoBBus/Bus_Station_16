using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net;
using System.Text;
using System.Text.Json.Serialization;

namespace ExpensesWebServer.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("testController")]
    public class testController : Controller
    {

        [HttpPost("UploadFile")]
        public IActionResult UploadFile(IFormFile fileData)
        {
            //var parsed = JsonConvert.SerializeObject(fileData);
            //var data = System.Convert.FromBase64String(parsed);
            //Console.WriteLine(data);

            return Ok();
        }
    }
}
