using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class OrderSummaryDTO
    {
        public decimal TotalOrder { get; set; }
        public IEnumerable<OrderDetailsSummaryDTO> OrderDetailsSummary { get; set; }
    }
}
