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
    public class OrderDetailsRepository : IOrderDetails
    {
        private readonly TecnicoVismaDBContext _context;
        public OrderDetailsRepository(TecnicoVismaDBContext context)
        {
            _context = context;
        }

        public int Count()
        {
            return _context.OrdersDetails.Count();
        }

        public OrderDetails GetOrderDetails(int id)
        {
            var orderDetails = _context.OrdersDetails.FirstOrDefault(x => x.Id == id);
            return orderDetails;
        }

        public IEnumerable<OrderDetails> GetAllOrderDetails()
        {
            var orderDetails = _context.OrdersDetails.ToList();
            return orderDetails;
        }

        public IEnumerable<OrderDetails> Insert(OrderDetails orderDetails)
        {
            _context.OrdersDetails.Add(orderDetails);
            _context.SaveChanges();
            return GetAllOrderDetails();
        }
    }
}
