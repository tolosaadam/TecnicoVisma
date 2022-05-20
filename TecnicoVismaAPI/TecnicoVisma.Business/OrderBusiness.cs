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
    public class OrderBusiness
    {
        public OrderBusiness(IOrder repository, IMapper mapper, OrderDetailsBusiness orderDetailsBusiness, ProductBusiness productBusiness, CustomerBusiness customerBusiness)
        {
            _repository = repository;
            _mapper = mapper;
            _orderDetailsBusiness = orderDetailsBusiness;
            _productBusiness = productBusiness;
            _customerBusiness = customerBusiness;
        }

        private readonly IOrder _repository;
        private readonly IMapper _mapper;
        private readonly OrderDetailsBusiness _orderDetailsBusiness;
        private readonly ProductBusiness _productBusiness;
        private readonly CustomerBusiness _customerBusiness;

        public int CountOrder()
        {
            return _repository.Count();
        }

        public OrderDTO GetOrder(int id)
        {
            var order = _repository.GetOrder(id);
            var orderDTO = _mapper.Map<Order, OrderDTO>(order);
            return orderDTO;

        }

        public IEnumerable<OrderDTO> GetAllOrder()
        {
            var order = _repository.GetAllOrder();
            var orderDTO = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(order);
            return orderDTO;
        }

        public IEnumerable<OrderDTO> CreateOrder(OrderDTO orderDTO)
        {
            var order = _mapper.Map<OrderDTO, Order>(orderDTO);
            var orders = _repository.Insert(order);
            var ordersDTO = _mapper.Map<IEnumerable<Order>, IEnumerable<OrderDTO>>(orders);
            return ordersDTO;
        }

        public OrderDTO GetOrderPrices(OrderDTO orderDTO)
        {
            orderDTO.TotalOrder = 0;
            foreach (OrderDetailsDTO orderDetailsDTO in orderDTO.OrderDetails)
            {
                var unitPrice = _productBusiness.GetProductPrice(orderDetailsDTO.ProductId);

                var productDiscount = _customerBusiness.GetProductDiscount(orderDTO.CustomerId);

                var discount = ((unitPrice * productDiscount) / 100);

                orderDetailsDTO.Price = orderDetailsDTO.ProductQuantity * (unitPrice - discount);
                orderDetailsDTO.ProductName = _productBusiness.GetProductName(orderDetailsDTO.ProductId);
                orderDetailsDTO.ProductDiscount = productDiscount;
                orderDetailsDTO.UnitPrice = unitPrice;
                orderDetailsDTO.NormalPrice = unitPrice * orderDetailsDTO.ProductQuantity;
                orderDetailsDTO.TotalDiscount = orderDetailsDTO.NormalPrice - orderDetailsDTO.Price;
                orderDTO.TotalOrder += orderDetailsDTO.Price;
            }

            return orderDTO;
        }
    }
}
