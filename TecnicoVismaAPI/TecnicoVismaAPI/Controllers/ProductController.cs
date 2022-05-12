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

        //[HttpGet("similar/{id}")]
        //public IActionResult GetSimilarProductsByCategory(int id)
        //{
        //    _logger.LogInformation($"GetSimilarProductsByCategory from Controller");

        //    return Ok(_business.GetSimilarProductsByCategory(id));
        //}

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            _logger.LogInformation($"GetAllProduct from Controller");

            return Ok(_business.GetAllProducts());
        }

        [HttpPost]
        public IActionResult CreateProduct(ProductDTO productDTO)
        {
            _logger.LogInformation($"CreateProduct from Controller");

            return Ok(_business.CreateProduct(productDTO));
        }

        [HttpDelete("remove/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _logger.LogInformation($"DeleteProduct from Controller");

            return Ok(_business.DeleteProduct(id));
        }

        [HttpPut("update")]
        public IActionResult updateProduct(ProductDTO productDTO)
        {
            _logger.LogInformation($"UpdateProduct from Controller");

            return Ok(_business.UpdateProduct(productDTO));
        }

    }
}
