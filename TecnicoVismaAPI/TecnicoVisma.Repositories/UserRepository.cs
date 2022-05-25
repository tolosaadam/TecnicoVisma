using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Data;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Interfaces;
using TecnicoVisma.Helpers;

namespace TecnicoVisma.Repositories
{
    public class UserRepository : IUser
    {
        private readonly TecnicoVismaDBContext _context;
        public UserRepository(TecnicoVismaDBContext context)
        {
            _context = context;
        }

        public User AuthenticateUser(AuthenticateDTO authenticateDTO)
        {

            var user = _context.Users.FirstOrDefault(x => x.MailAddress == authenticateDTO.MailAddress && x.Password == EncodingHelpers.EncodeTOsha256(authenticateDTO.Password));
            return user;
        }

        public User CheckUserAvailabity(string mailAddress)
        {
            var user = _context.Users.FirstOrDefault(x => x.MailAddress == mailAddress);
            return user;
        }

        public List<string> GetAllMailAddresses()
        {
            var mailAddresses = _context.Users.Select(x => x.MailAddress).ToList();
            return mailAddresses;
        }

        public User Insert(User user)
        {
            user.Password = EncodingHelpers.EncodeTOsha256(user.Password);
            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public User GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);
            return user;
        }
    }
}
