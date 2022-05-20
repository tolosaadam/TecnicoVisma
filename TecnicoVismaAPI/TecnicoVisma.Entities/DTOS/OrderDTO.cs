using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public DateTime DateOfOrder { get; set; }
        public decimal TotalOrder { get; set; }
        public List<OrderDetailsDTO> OrderDetails { get; set; }
    }
}
