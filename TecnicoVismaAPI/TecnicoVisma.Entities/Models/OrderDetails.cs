using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.Models
{
    public class OrderDetails
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int ProductQuantity { get; set; }
        //public decimal? UnitPrice { get; set; }
        //[Range(1, 100, ErrorMessage = "Price Must be Between {0} and {1}")]
        public decimal Price { get; set; }
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
