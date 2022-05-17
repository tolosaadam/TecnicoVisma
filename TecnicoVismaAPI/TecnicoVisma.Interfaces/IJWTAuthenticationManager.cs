using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Interfaces
{
    public interface IJWTAuthenticationManager
    {
        string GenerateToken(string mailAddress);
        double GetTokenLifeTime(string token);
    }
}
