using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace ExpensesWebServer.Services;

public class JWTService
{
    private string _secureKey = "change me please change me please";
    public JwtSecurityToken? JwtSecurityToken(HttpRequest request)
    {
        JwtSecurityToken verifiedJWT;
        var jwt = request.Cookies["jwt"];
        if (jwt == null)
        {
            return null;
        }
        verifiedJWT = Verify(jwt);
        return verifiedJWT;
    }
    public string Generate(int id)
    {
        var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secureKey));
        var credential = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256Signature);
        var header = new JwtHeader(credential);

        var payload = new JwtPayload(issuer: id.ToString(), audience: null, claims: null, notBefore: null, expires: DateTime.Today.AddDays(1));
        var securityToken = new JwtSecurityToken(header, payload);

        return new JwtSecurityTokenHandler().WriteToken(securityToken);
    }
    public JwtSecurityToken Verify(string jwt)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(_secureKey);
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
