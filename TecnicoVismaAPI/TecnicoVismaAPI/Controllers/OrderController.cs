using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TecnicoVisma.Business;
using TecnicoVisma.Entities.DTOS;

namespace TecnicoVismaAPI.Controllers
{
    [OpenApiTag("Order",
               Description = "Order Controller")]
    [Route("api/order")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;
        private readonly OrderBusiness _business;
        public OrderController(ILogger<OrderController> logger, OrderBusiness business)
        {
            _logger = logger;
            _business = business;
        }

        [Authorize]
        [HttpGet("count")]
        public async Task<IActionResult> CountOrder()
        {
            _logger.LogInformation($"CountOrder from Controller");
            return Ok(await Task.FromResult(_business.CountOrder()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(int id)
        {
            _logger.LogInformation($"GetOrder from Controller");

            return Ok(await Task.FromResult(_business.GetOrder(id)));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllOrder()
        {
            _logger.LogInformation($"GetAllOrder from Controller");
            var response = new ResponseDTO<IEnumerable<OrderDTO>>();
            try
            {
                var orders = await Task.FromResult(_business.GetAllOrder());
                response.Data = orders;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error getting all customers", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }
        }

        [Authorize]
        [HttpPost("getOrderSummary")]
        public async Task<IActionResult> GetOrderSummary(OrderDTO orderDTO)
        {

            _logger.LogInformation($"GetOrderSummary from Controller");
            var response = new ResponseDTO<OrderSummaryDTO>();
            try
            {
                var orderSummaryDTO = await Task.FromResult(_business.GetOrderSummary(orderDTO));
                response.Data = orderSummaryDTO;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Getting a order summary  = {orderDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDTO orderDTO)
        {
            _logger.LogInformation($"CreateOrder from Controller");
            var response = new ResponseDTO<OrderDTO>();
            try
            {
                var orders = await Task.FromResult(_business.CreateOrder(orderDTO));
                response.Data = orders;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Adding a order  = {orderDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }

        }
    }
}
