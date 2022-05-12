using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.Models
{
    public class Customer
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string MailAddress { get; set; }
        public DateTime? EnteredDate { get; set; }
        public string Gender { get; set; }
    }
}
