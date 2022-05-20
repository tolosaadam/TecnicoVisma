using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class OrderDetailsDTO
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string ProductName { get; set; }
        public int ProductDiscount { get; set; }
        public decimal TotalDiscount { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal NormalPrice { get; set; }
        public decimal Price { get; set; }
    }
}
