using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class OrderDetailsSummaryDTO
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public int ProductQuantity { get; set; }
        public int ProductDiscount { get; set; }
        public decimal ProductUnitPrice { get; set; }
        public decimal TotalDiscount { get; set; }
        public decimal TotalNormalPrice { get; set; }
        public decimal TotalDiscountedPrice { get; set; }
    }
}