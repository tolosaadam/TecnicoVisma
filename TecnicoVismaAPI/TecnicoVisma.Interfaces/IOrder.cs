using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.Interfaces
{
    public interface IOrder
    {
        int Count();
        Order GetOrder(int id);
        IEnumerable<Order> GetAllOrder();
        Order Insert(Order order);
    }
}
