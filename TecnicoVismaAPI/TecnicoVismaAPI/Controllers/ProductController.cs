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
    [OpenApiTag("Product",
               Description = "Product Controller")]
    [Route("api/product")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly ProductBusiness _business;

        public ProductController(ILogger<ProductController> logger, ProductBusiness business)
        {
            _logger = logger;
            _business = business;
        }

        [Authorize]
        [HttpGet("count")]
        public async Task<IActionResult> CountProduct()
        {
            _logger.LogInformation($"CountProduct from Controller");

            return Ok(await Task.FromResult(_business.CountProduct()));
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            _logger.LogInformation($"GetProduct from Controller");
            return Ok(await Task.FromResult(_business.GetProduct(id)));
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            _logger.LogInformation($"GetAllProduct from Controller");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = await Task.FromResult(_business.GetAllProducts());
                response.Data = products;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error getting all products", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductDTO productDTO)
        {
            _logger.LogInformation($"CreateProduct from Controller");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = await Task.FromResult(_business.CreateProduct(productDTO));
                response.Data = products;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Adding a product  = {productDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }

        }

        [Authorize]
        [HttpDelete("remove")]
        public async Task<IActionResult> DeleteProduct([FromBody]List<int> ids)
        {
            _logger.LogInformation($"DeleteProduct from Controller ids = {ids}");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = await Task.FromResult(_business.DeleteProduct(ids));
                response.Data = products;
                return Ok(response);

            }
            catch(Exception e)
            {
                _logger.LogError($"An error occurring Deleting products ids = {ids}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
                
            }           
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateProduct(ProductDTO productDTO)
        {
            _logger.LogInformation($"UpdateProduct from Controller");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = await Task.FromResult(_business.UpdateProduct(productDTO));
                response.Data = products;
                return Ok(response);
            }
            catch(Exception e)
            {
                _logger.LogError($"An error occurring editing the  product  = {productDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }
        }

        [Authorize]
        [HttpGet("getCategories")]
        public async Task<IActionResult> GetCategories()
        {
            _logger.LogInformation($"GetCategories from Controller");
            var response = new ResponseDTO<IEnumerable<CategoryDTO>>();
            try
            {
                var products = await Task.FromResult(_business.GetCategories());
                response.Data = products;
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring getting Categories", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }
        }

    }
}
