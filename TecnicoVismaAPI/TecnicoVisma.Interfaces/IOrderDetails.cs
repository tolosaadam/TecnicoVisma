using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.Interfaces
{ 
    public interface IOrderDetails
    {
        int Count();
        OrderDetails GetOrderDetails(int id);
        IEnumerable<OrderDetails> GetAllOrderDetails();
        IEnumerable<OrderDetails> Insert(OrderDetails orderDetails);
    }

}
