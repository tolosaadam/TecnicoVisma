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

        [HttpGet("count")]
        public IActionResult CountProduct()
        {
            _logger.LogInformation($"CountProduct from Controller");

            return Ok(_business.CountProduct());
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(int id)
        {
            _logger.LogInformation($"GetProduct from Controller");

            return Ok(_business.GetProduct(id));
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            _logger.LogInformation($"GetAllProduct from Controller");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = _business.GetAllProducts();
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

        [HttpPost]
        public IActionResult CreateProduct(ProductDTO productDTO)
        {
            _logger.LogInformation($"CreateProduct from Controller");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = _business.CreateProduct(productDTO);
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

        [HttpDelete("remove")]
        public IActionResult DeleteProduct([FromBody]List<int> ids)
        {
            _logger.LogInformation($"DeleteProduct from Controller ids = {ids}");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = _business.DeleteProduct(ids);
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

        [HttpPut("update")]
        public IActionResult updateProduct(ProductDTO productDTO)
        {
            _logger.LogInformation($"UpdateProduct from Controller");
            var response = new ResponseDTO<IEnumerable<ProductDTO>>();
            try
            {
                var products = _business.UpdateProduct(productDTO);
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

    }
}
