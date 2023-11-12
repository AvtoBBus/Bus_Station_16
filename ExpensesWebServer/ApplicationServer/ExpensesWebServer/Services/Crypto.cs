namespace ExpensesWebServer.Services
{
    static public class Crypto
    {
        static public string generateSalt() => BCrypt.Net.BCrypt.GenerateSalt();
        static public string HashPassword(string password) => BCrypt.Net.BCrypt.HashPassword(password);
    }
}
