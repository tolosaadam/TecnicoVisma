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
    [OpenApiTag("Customer",
               Description = "Customer Controller")]
    [Route("api/customer")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ILogger<CustomerController> _logger;
        private readonly CustomerBusiness _business;
        public CustomerController(ILogger<CustomerController> logger, CustomerBusiness business)
        {
            _logger = logger;
            _business = business;
        }

        [Authorize]
        [HttpGet("count")]
        public async Task<IActionResult> CountCustomer()
        {
            _logger.LogInformation($"CountCustomer from Controller");
            return Ok(await Task.FromResult(_business.CountCustomer()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            _logger.LogInformation($"GetCustomer from Controller");

            return Ok(await Task.FromResult(_business.GetCustomer(id)));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers()
        {
            _logger.LogInformation($"GetAllCustomers from Controller");
            var response = new ResponseDTO<IEnumerable<CustomerDTO>>();
            try
            {
                var customers = await Task.FromResult(_business.GetAllCustomers());
                response.Data = customers;
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
        [HttpPost]
        public async Task<IActionResult> CreateCustomer(CustomerDTO customerDTO)
        {
            _logger.LogInformation($"CreateCustomer from Controller");
            var response = new ResponseDTO<IEnumerable<CustomerDTO>>();
            try
            {
                var customers = await Task.FromResult(_business.CreateCustomer(customerDTO));
                response.Data = customers;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Adding a customer  = {customerDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }

        }

        [Authorize]
        [HttpDelete("remove")]
        public async Task<IActionResult> DeleteCustomer([FromBody] List<int> ids)
        {
            _logger.LogInformation($"DeleteCustomer from Controller ids = {ids}");
            var response = new ResponseDTO<IEnumerable<CustomerDTO>>();
            try
            {
                var customers = await Task.FromResult(_business.DeleteCustomer(ids));
                response.Data = customers;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Deleting customers ids = {ids}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateCustomer(CustomerDTO customerDTO)
        {
            _logger.LogInformation($"UpdateProduct from Controller");
            var response = new ResponseDTO<IEnumerable<CustomerDTO>>();
            try
            {
                var customers = await Task.FromResult(_business.UpdateCustomer(customerDTO));
                response.Data = customers;
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring editing the  customer  = {customerDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }
        }

        [Authorize]
        [HttpGet("mailAddresses")]
        public async Task<IActionResult> GetAllMailAddresses()
        {
            _logger.LogInformation($"Getting all mail address");
            var response = new ResponseDTO<List<string>>();
            try
            {
                var mailAddresses = await Task.FromResult(_business.GetAllMailAddresses());
                response.Data = mailAddresses;
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Getting all mail address", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }
        }
    }
}
