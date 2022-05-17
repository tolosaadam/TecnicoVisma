using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.Interfaces
{
    public interface IUser
    {
        User AuthenticateUser(AuthenticateDTO authenticateDTO);
        User CheckUserAvailabity(string mailAddress);
        User Insert(User user);
        List<string> GetAllMailAddresses();
    }
}
