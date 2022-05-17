using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Interfaces;

namespace TecnicoVisma.JWTAuthenticationManager
{
    public class JWTAuthenticationManager : IJWTAuthenticationManager
    {

        private readonly IConfiguration _configuration;
        public JWTAuthenticationManager(IConfiguration config)
        {
            _configuration = config;
        }

        public string GenerateToken(string mailAddress)
        {
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Email", mailAddress)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddSeconds(Convert.ToInt32(_configuration["Jwt:SessionTime"])),
                signingCredentials: signIn);
            var result = DateTime.UtcNow;
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public double GetTokenLifeTime(string token)
        {
            var lifeTime = new JwtSecurityTokenHandler().ReadToken(token).ValidTo;
            var today = DateTime.UtcNow;
            var result = lifeTime - today;
           
            return result.TotalSeconds;
        }
    }
}
