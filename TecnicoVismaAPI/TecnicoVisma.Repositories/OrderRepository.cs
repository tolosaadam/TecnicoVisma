using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Data;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Interfaces;

namespace TecnicoVisma.Repositories
{
    public class OrderRepository : IOrder
    {
        private readonly TecnicoVismaDBContext _context;
        public OrderRepository(TecnicoVismaDBContext context)
        {
            _context = context;
        }

        public int Count()
        {
            return _context.Orders.Count();
        }

        public Order GetOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(x => x.Id == id);
            return order;
        }

        public IEnumerable<Order> GetAllOrder()
        {
            var order = _context.Orders.ToList();
            return order;
        }

        public Order Insert(Order order)
        {
            _context.Orders.Add(order);
            _context.SaveChanges();
            return order;
        }
    }
}
