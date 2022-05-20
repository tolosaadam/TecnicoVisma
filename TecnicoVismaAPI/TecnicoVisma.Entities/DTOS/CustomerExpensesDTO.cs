using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class CustomerExpensesDTO
    {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public decimal TotalProducts { get; set; }
        public int TotalOrders { get; set; }
        public decimal TotalExpense { get; set; }
    }
}
