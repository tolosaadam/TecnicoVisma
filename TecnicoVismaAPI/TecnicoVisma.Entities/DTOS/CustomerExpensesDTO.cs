using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class CustomerExpensesDTO
    {
        public int OrderId { get; set; }
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime DateOfOrder { get;set; }
        public string MailAddress { get; set; }
        public decimal TotalProducts { get; set; }
        public decimal TotalExpense { get; set; }
    }
}
