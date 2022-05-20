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
    public class OrderDetailsBusiness
    {
        public OrderDetailsBusiness(IOrderDetails repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        private readonly IOrderDetails _repository;
        private readonly IMapper _mapper;

        public int CountOrderDetails()
        {
            return _repository.Count();
        }
        public OrderDetailsDTO GetOrderDetails(int id)
        {
            var orderDetails = _repository.GetOrderDetails(id);
            var orderDetailsDTO = _mapper.Map<OrderDetails, OrderDetailsDTO>(orderDetails);
            return orderDetailsDTO;

        }

        public IEnumerable<OrderDetailsDTO> GetAllOrderDetails()
        {
            var orderDetails = _repository.GetAllOrderDetails();
            var orderDetailsDTO = _mapper.Map<IEnumerable<OrderDetails>, IEnumerable<OrderDetailsDTO>>(orderDetails);
            return orderDetailsDTO;
        }

        public IEnumerable<OrderDetailsDTO> CreateCustomer(OrderDetailsDTO orderDetailsDTO)
        {
            var orderDetails = _mapper.Map<OrderDetailsDTO, OrderDetails>(orderDetailsDTO);
            var ordersDetails = _repository.Insert(orderDetails);
            var ordersDetailsDTO = _mapper.Map<IEnumerable<OrderDetails>, IEnumerable<OrderDetailsDTO>>(ordersDetails);
            return ordersDetailsDTO;
        }
    }
}
