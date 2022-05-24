using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Data;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Interfaces;
using System.Security.Cryptography;

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

            var user = _context.Users.FirstOrDefault(x => x.MailAddress == authenticateDTO.MailAddress && x.Password == sha256_hash(authenticateDTO.Password));
            return user;
        }

        public static String sha256_hash(string value)
        {
            StringBuilder Sb = new StringBuilder();

            using (var hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
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
            user.Password = sha256_hash(user.Password);
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
