using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CustomerId { get; set; }
        public DateTime DateOfOrder { get; set; }
        public decimal TotalOrder { get; set; }
        public virtual User User { get; set; }
        public virtual Customer Customer { get; set; }
        public virtual ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
