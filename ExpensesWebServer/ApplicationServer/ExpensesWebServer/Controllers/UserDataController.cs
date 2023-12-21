using ClosedXML.Excel;
using CsvImportProcessorsLibrary;
using ExpensesWebServer.Data;
using ExpensesWebServer.Models.DTOs;
using ExpensesWebServer.Models.Entities;
using ExpensesWebServer.Services;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace ExpensesWebServer.Controllers;

[ApiController]
[Route("userData")]
public class UserDataController : Controller
{
    private ILogger _logger; // Логгер в stdout
    private JWTService _jwtService; // Сервис для работы с JWT
    private IExpenseRepository _expenseReposirity; // Интерфейс бд для работы с тратами
    public UserDataController(
        ILogger<UserDataController> logger,
        IExpenseRepository expensesRepository,
        JWTService jwtService)
    {
        _logger = logger;
        _expenseReposirity = expensesRepository;
        _jwtService = jwtService;
    }
    /// <summary>
    /// Returns list of expenses made in between given date
    /// </summary>
    /// <param name="dto">Dates [start,stop]</param>
    /// <returns>List<Expenses></returns>
    [HttpPost]
    [Route("getAllBetweenDates")]
    public async Task<IActionResult> GetAllBetweenDates(DatesDTO dto)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }
        int userId;
        if (!int.TryParse(verifiedJWT.Issuer, out userId))
        {
            _logger.LogError("Error parsing issuer");
            return BadRequest("Error parsing issuer");
        }
        return Ok(await _expenseReposirity.GetRangeBetweenDatesById(
                            userId,
                            DateOnly.Parse(dto.StartDate),
                            DateOnly.Parse(dto.StopDate)));
    }
    /// <summary>
    /// Retunrs all of expenses
    /// </summary>
    /// <returns>List<Expenses></returns>
    [HttpGet]
    [Route("getAll")]
    public async Task<IActionResult> GetAllExpenses()
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }
        int userId;
        if (!int.TryParse(verifiedJWT.Issuer, out userId))
        {
            _logger.LogError("Error parsing issuer");
            return BadRequest("Error parsing issuer");
        }

        return Ok(await _expenseReposirity.GetByIdAsync(userId));
    }
    /// <summary>
    /// Adds new expense
    /// </summary>
    /// <param name="obj">Expense to be saved</param>
    /// <returns>Saved expense</returns>
    [HttpPost]
    [Route("add")]
    public async Task<IActionResult> Add(Expense obj)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }

        try
        {
            await _expenseReposirity.CreateAsync(obj);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error while creating new expense\nMessage:{ex.Message}");
            return BadRequest("Error while creating new expense");
        }
        return Ok(obj);
    }
    /// <summary>
    /// Delete operation for expense
    /// </summary>
    /// <param name="id">Id of the expense</param>
    /// <returns></returns>
    [HttpPost]
    [Route("delete/{id}")]
    public IActionResult Delete(int id)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }

        try
        {
            _expenseReposirity.Delete(id);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error while deleting\nMessage:{ex.Message}");
            return BadRequest("Error while deleting");
        }
        return NoContent();
    }
    /// <summary>
    /// Updates expense
    /// </summary>
    /// <param name="obj">New statement</param>
    /// <returns>Saved expense</returns>
    [HttpPost]
    [Route("update")]
    public IActionResult Update(Expense obj)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }

        try
        {
            _expenseReposirity.Update(obj);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Error while updating\nMessage:{ex.Message}");
            return BadRequest("Error while updating");
        }
        return Ok(obj);
    }
    /// <summary>
    /// Import from xlsx file
    /// </summary>
    /// <param name="file"></param>
    /// <returns></returns>
    [HttpPost]
    [Route("import")]
    public async Task<IActionResult> Import(ExcelPackage file)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }
        var expensesRow  = SberbankCsvProcessor.ProcessXlsx(file);
        return Ok();
    }
    /// <summary>
    /// Returns xlsx file 
    /// </summary>
    /// <param name="dto">Dates [start,stop]</param>
    /// <returns>.xlsx file</returns>
    [HttpPost]
    [Route("export")]
    public async Task<IActionResult> Export(DatesDTO dto)
    {
        var verifiedJWT = _jwtService.JwtSecurityToken(Request);
        if (verifiedJWT == null)
        {
            _logger.LogWarning("JWT was not found");
            return Unauthorized();
        }
        int userId;
        if (!int.TryParse(verifiedJWT.Issuer, out userId))
        {
            _logger.LogError("Error parsing issuer");
            return BadRequest("Error parsing issuer");
        }
        var data = await _expenseReposirity.GetRangeBetweenDatesById(
                            userId,
                            DateOnly.Parse(dto.StartDate),
                            DateOnly.Parse(dto.StopDate));

        using (var workbook = new XLWorkbook())
        {
            var worksheet = workbook.Worksheets.Add("Траты");

            worksheet.Cell(1, 1).Value = "Описание";
            worksheet.Cell(1, 2).Value = "Сумма";
            worksheet.Cell(1, 3).Value = "Дата";

            var currentRow = 2;
            foreach (var item in data)
            {
                worksheet.Cell(currentRow, 1).Value = item.ExpenseDescription;
                worksheet.Cell(currentRow, 2).Value = item.Amount;
                worksheet.Cell(currentRow, 3).Value = item.CreationDate.ToShortDateString();
                currentRow++;
            }

            using (var stream = new MemoryStream())
            {
                workbook.SaveAs(stream);
                var content = stream.ToArray();

                return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Export.xlsx");
            }
        }
    }
}
