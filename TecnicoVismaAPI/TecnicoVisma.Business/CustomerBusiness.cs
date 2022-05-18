using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Interfaces;

namespace TecnicoVisma.Business
{
    public class CustomerBusiness
    {
        public CustomerBusiness(ICustomer repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        private readonly ICustomer _repository;
        private readonly IMapper _mapper;


        public int CountCustomer()
        {
            return _repository.Count();
        }
        public CustomerDTO GetCustomer(int id)
        {
            var customer = _repository.GetCustomer(id);
            var customerDTO = _mapper.Map<Customer, CustomerDTO>(customer);
            return customerDTO;

        }

        public IEnumerable<CustomerDTO> GetAllCustomers()
        {
            var customers = _repository.GetCustomers();
            var customersDTO = _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerDTO>>(customers);
            return customersDTO;
        }

        public IEnumerable<CustomerDTO> CreateCustomer(CustomerDTO customerDTO)
        {
            var customer = _mapper.Map<CustomerDTO, Customer>(customerDTO);
            var customers = _repository.Insert(customer);
            var customersDTO = _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerDTO>>(customers);
            return customersDTO;
        }

        public IEnumerable<CustomerDTO> DeleteCustomer(List<int> ids)
        {
            var customers = _repository.Delete(ids);
            var customersDTO = _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerDTO>>(customers);
            return customersDTO;
        }

        public IEnumerable<CustomerDTO> UpdateCustomer(CustomerDTO customerDTO)
        {
            var customer = _mapper.Map<CustomerDTO, Customer>(customerDTO);
            var customers = _repository.Update(customer);
            var customersDTO = _mapper.Map<IEnumerable<Customer>, IEnumerable<CustomerDTO>>(customers);
            return customersDTO;
        }

        public List<string> GetAllMailAddresses()
        {
            return _repository.GetAllMailAddresses();
        }
    }
}
