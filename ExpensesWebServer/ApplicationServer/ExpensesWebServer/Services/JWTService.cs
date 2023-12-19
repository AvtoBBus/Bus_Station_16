using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ExpensesWebServer.Services
{
    public class JWTService
    {
        private string secureKey = "change me please change me please";
        public JwtSecurityToken? JwtSecurityToken(HttpRequest request)
        {
            JwtSecurityToken verifiedJWT;
            var jwt = request.Cookies["jwt"];
            if (jwt == null)
            {
                return null;
            }
            verifiedJWT = verify(jwt);
            return verifiedJWT;
        }
        public string generate(int id)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secureKey));
            var credential = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
            var header = new JwtHeader(credential);

            var payload = new JwtPayload(issuer: id.ToString(), audience: null, claims: null, notBefore: null, expires: DateTime.Today.AddDays(1));
            var securityToken = new JwtSecurityToken(header, payload);

            return new JwtSecurityTokenHandler().WriteToken(securityToken);
        }
        public JwtSecurityToken verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(secureKey);
            tokenHandler.ValidateToken(
                jwt, 
                new TokenValidationParameters()
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false
                },
                out SecurityToken validatedToken
             );
            return (JwtSecurityToken) validatedToken;
        }
    }
}
