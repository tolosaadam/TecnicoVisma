using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NSwag.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TecnicoVisma.Entities.DTOS;

namespace TecnicoVismaAPI.Controllers
{
    [OpenApiTag("Contact",
               Description = "Contact Controller")]
    [Route("api/contact")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;

        public ContactController(ILogger<ContactController> logger)
        {
            _logger = logger;

        }

        [Authorize]
        [HttpPost("sendMail")]
        public async Task<IActionResult> SendMail(ContactDTO contactDTO)
        {
            _logger.LogInformation($"Contact Send mail from Controller");
            var response = new ResponseDTO<ContactDTO>();
            try
            {
                //var customers = await Task.FromResult(_business.CreateCustomer(customerDTO));
                //response.Data = customers;
                response.Data = contactDTO;
                return await Task.FromResult(Ok(response));

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring sending a mail with contact = {contactDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }
        }
    }
}
