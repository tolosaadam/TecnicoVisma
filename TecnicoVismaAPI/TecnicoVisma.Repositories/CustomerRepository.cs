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
    public class CustomerRepository : ICustomer
    {
        private readonly TecnicoVismaDBContext _context;
        public CustomerRepository(TecnicoVismaDBContext context)
        {
            _context = context;
        }
        public int Count()
        {
            return _context.Customers.Count();
        }

        public IEnumerable<Customer> Delete(List<int> ids)
        {
            _context.Customers.RemoveRange(_context.Customers.Where(x => ids.Contains(x.Id)));
            _context.SaveChanges();
            return GetCustomers();
        }

        public Customer GetCustomer(int id)
        {
            var customer = _context.Customers.FirstOrDefault(x => x.Id == id);
            return customer;
        }

        public IEnumerable<Customer> GetCustomers()
        {
            var customers = _context.Customers.ToList();
            return customers;
        }

        public IEnumerable<Customer> Insert(Customer customer)
        {
            _context.Customers.Add(customer);
            _context.SaveChanges();
            return GetCustomers();
        }

        public IEnumerable<Customer> Update(Customer customer)
        {
            _context.Customers.Update(customer);
            _context.SaveChanges();
            return GetCustomers();
        }

        public List<string> GetAllMailAddresses()
        {
            var mailAddresses = _context.Customers.Select(x => x.MailAddress).ToList();
            return mailAddresses;
        }

        public int GetProductDiscountById(int id)
        {
            var discount = _context.Customers.FirstOrDefault(x => x.Id == id).ProductDiscount;
            return discount;
        }
    }
}
