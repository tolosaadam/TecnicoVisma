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
    [OpenApiTag("OrderDetails",
               Description = "OrderDetails Controller")]
    [Route("api/orderDetails")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly ILogger<OrderDetailsController> _logger;
        private readonly OrderDetailsBusiness _business;

        public OrderDetailsController(ILogger<OrderDetailsController> logger, OrderDetailsBusiness business)
        {
            _logger = logger;
            _business = business;
        }

    }
}
