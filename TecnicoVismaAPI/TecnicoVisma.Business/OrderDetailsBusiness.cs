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
        public OrderDetailsBusiness(IOrderDetails repository, IMapper mapper, ProductBusiness productBusiness, CustomerBusiness customerBusiness)
        {
            _repository = repository;
            _mapper = mapper;
            _productBusiness = productBusiness;
            _customerBusiness = customerBusiness;

        }

        private readonly IOrderDetails _repository;
        private readonly IMapper _mapper;
        private readonly ProductBusiness _productBusiness;
        private readonly CustomerBusiness _customerBusiness;

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

        public IEnumerable<OrderDetailsDTO> CreateOrderDetails(OrderDetailsDTO orderDetailsDTO)
        {
            var orderDetails = _mapper.Map<OrderDetailsDTO, OrderDetails>(orderDetailsDTO);
            var ordersDetails = _repository.Insert(orderDetails);
            var ordersDetailsDTO = _mapper.Map<IEnumerable<OrderDetails>, IEnumerable<OrderDetailsDTO>>(ordersDetails);
            return ordersDetailsDTO;
        }

        public void DeleteProductsFromStock(IEnumerable<OrderDetailsDTO> ordersDetailsDTO)
        {
            var productsStockValidator = new List<ProductStockValidator>();

            foreach (OrderDetailsDTO orderDetailsDTO in ordersDetailsDTO)
            {
                var productStockValidator = new ProductStockValidator()
                {
                    Id = orderDetailsDTO.ProductId,
                    ProductQuantity = orderDetailsDTO.ProductQuantity
                };
                productsStockValidator.Add(productStockValidator);
            }

            _productBusiness.DeleteProductsFromStock(productsStockValidator);
        }


        public IEnumerable<OrderDetailsSummaryDTO> CalculateAndValidateAllPrices(int customerId, IEnumerable<OrderDetailsDTO> ordersDetailsDTO)
        {
            var productsToCheck = new List<ProductStockValidator>();
            
            var ordersDetailsSummaryDTO = new List<OrderDetailsSummaryDTO>();
            foreach (OrderDetailsDTO orderDetailsDTO in ordersDetailsDTO)
            {
                ///// Product Stock Validator
                var productToCheck = new ProductStockValidator()
                {
                    Id = orderDetailsDTO.ProductId,
                    ProductQuantity = orderDetailsDTO.ProductQuantity
                };
                productsToCheck.Add(productToCheck);
                /////

                var productName = _productBusiness.GetProductName(orderDetailsDTO.ProductId);

                var unitPrice = _productBusiness.GetProductPrice(orderDetailsDTO.ProductId);
                var productDiscount = _customerBusiness.GetProductDiscount(customerId);
                var discount = ((unitPrice * productDiscount) / 100);
                var price = orderDetailsDTO.ProductQuantity * (unitPrice - discount);

                OrderDetailsSummaryDTO orderDetailsSummaryDTO = new()
                {
                    ProductId = orderDetailsDTO.ProductId,
                    ProductName = productName,
                    ProductQuantity = orderDetailsDTO.ProductQuantity,
                    ProductDiscount = productDiscount,
                    ProductUnitPrice = unitPrice,
                    TotalDiscount = (unitPrice * orderDetailsDTO.ProductQuantity) - price,
                    TotalNormalPrice = unitPrice * orderDetailsDTO.ProductQuantity,
                    TotalDiscountedPrice = price

                };
                ordersDetailsSummaryDTO.Add(orderDetailsSummaryDTO);

            }

            if (!_productBusiness.ValidateProductsStock(productsToCheck))
            {
                throw (new Exception());
            }

            return ordersDetailsSummaryDTO;
        }
    }
}


//orderDTO.TotalOrder = 0;
//foreach (OrderDetailsDTO orderDetailsDTO in orderDTO.OrderDetails)
//{
//    var unitPrice = _productBusiness.GetProductPrice(orderDetailsDTO.ProductId);

//    var productDiscount = _customerBusiness.GetProductDiscount(orderDTO.CustomerId);

//    var discount = ((unitPrice * productDiscount) / 100);

//    orderDetailsDTO.Price = orderDetailsDTO.ProductQuantity * (unitPrice - discount);
//    orderDetailsDTO.ProductName = _productBusiness.GetProductName(orderDetailsDTO.ProductId);
//    orderDetailsDTO.ProductDiscount = productDiscount;
//    orderDetailsDTO.UnitPrice = unitPrice;
//    orderDetailsDTO.NormalPrice = unitPrice * orderDetailsDTO.ProductQuantity;
//    orderDetailsDTO.TotalDiscount = orderDetailsDTO.NormalPrice - orderDetailsDTO.Price;
//    orderDTO.TotalOrder += orderDetailsDTO.Price;
//}

//return orderDTO;