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
        public OrderBusiness(IOrder repository, IMapper mapper, OrderDetailsBusiness orderDetailsBusiness)
        {
            _repository = repository;
            _mapper = mapper;
            _orderDetailsBusiness = orderDetailsBusiness;
        }

        private readonly IOrder _repository;
        private readonly IMapper _mapper;
        private readonly OrderDetailsBusiness _orderDetailsBusiness;

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

        public OrderDTO CreateOrder(OrderDTO orderDTO)
        {
            var order = _mapper.Map<OrderDTO, Order>(orderDTO);
            var orders = _repository.Insert(order);
            var ordersDTO = _mapper.Map<Order, OrderDTO>(orders);
            return ordersDTO;
        }

        public OrderSummaryDTO GetOrderSummary(OrderDTO orderDTO)
        {
            OrderSummaryDTO orderSummaryDTO = new();
            orderSummaryDTO.OrderDetailsSummary = _orderDetailsBusiness.CalculateAndValidateAllPrices(orderDTO.CustomerId, orderDTO.OrderDetails);
            orderSummaryDTO.TotalOrder = orderSummaryDTO.OrderDetailsSummary.Select(x => x.TotalDiscountedPrice).Sum();
            return orderSummaryDTO;
        }

        public async Task<IList<CustomerExpensesDTO>> GetAllCustomerExpenses()
        {
            var customerExpensesDTO = new List<CustomerExpensesDTO>();
            var orders = await _repository.GetAllCustomerExpenses();

            foreach (Order order in orders)
            {
                CustomerExpensesDTO customerExpenseDTO = new()
                {

                    OrderId = order.Id,
                    CustomerId = order.CustomerId,
                    CustomerName = order.Customer.FirstName + " " + order.Customer.LastName,
                    DateOfOrder = order.DateOfOrder,
                    MailAddress = order.Customer.MailAddress,
                    TotalProducts = order.OrderDetails.Sum(x => x.ProductQuantity),
                    TotalExpense = order.TotalOrder,
                };
                customerExpensesDTO.Add(customerExpenseDTO);
            }

            return customerExpensesDTO;
        }
    }
}
