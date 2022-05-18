using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.Interfaces
{
    public interface ICustomer
    {
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomer(int id);
        IEnumerable<Customer> Insert(Customer customer);
        IEnumerable<Customer> Update(Customer customer);
        IEnumerable<Customer> Delete(List<int> ids);
        int Count();
    }
}
