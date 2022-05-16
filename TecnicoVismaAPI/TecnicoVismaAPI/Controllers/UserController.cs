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
    [OpenApiTag("User",
               Description = "User Controller")]
    [Route("api/user")]
    [SwaggerResponse(204, typeof(void))]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserBusiness _business;

        public UserController(ILogger<UserController> logger, UserBusiness business)
        {
            _logger = logger;
            _business = business;
        }

        [HttpPost("authenticate")]
        public IActionResult AuthenticateUser(AuthenticateDTO authenticateDTO)
        {
            _logger.LogInformation($"Login user,  credentials = {authenticateDTO}");
            var response = new ResponseDTO<ResponseLoginDTO>();
            try
            {
                var responseLogin = _business.AuthenticateUser(authenticateDTO);
                response.Data = responseLogin;
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Login the user, credentials = {authenticateDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);
            }

        }

        [HttpPost]
        public IActionResult CreateUser(UserDTO userDTO)
        {
            _logger.LogInformation($"CreateProduct from Controller");
            var response = new ResponseDTO<UserDTO>();
            try
            {
                var products = _business.CreateUser(userDTO);
                response.Data = products;
                return Ok(response);

            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Adding a user  = {userDTO}", e);
                response.ErrorMessage = e.Message;
                return BadRequest(response);

            }

        }
    }
}
