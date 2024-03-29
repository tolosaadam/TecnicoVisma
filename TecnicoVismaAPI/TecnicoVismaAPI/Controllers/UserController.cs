﻿using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("authenticate")]
        public async Task<IActionResult> AuthenticateUser(AuthenticateDTO authenticateDTO)
        {
            _logger.LogInformation($"Login user,  credentials = {authenticateDTO}");
            var response = new ResponseDTO<ResponseLoginDTO>();
            try
            {
                var responseLogin = await Task.FromResult(_business.AuthenticateUser(authenticateDTO));
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
        public async Task<IActionResult> CreateUser(UserDTO userDTO)
        {
            _logger.LogInformation($"CreateProduct from Controller");
            var response = new ResponseDTO<UserDTO>();
            try
            {
                var products = await Task.FromResult(_business.CreateUser(userDTO));
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

        [HttpGet("tokenLifeTime/{token}")]
        public async Task<IActionResult> GetTokenLifeTime(string token) 
        {
            _logger.LogInformation($"Getting all mail address");
            try
            {
                var lifeTime = await Task.FromResult(_business.GetTokenLifeTime(token));
                return Ok(lifeTime);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error occurring Getting all mail address", e);
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            
            _logger.LogInformation($"Getting a user from controller");
            var response = new ResponseDTO<UserDTO>();
            try
            {
                var user = await Task.FromResult(_business.GetUser(id));
                response.Data = user;
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError($"An error getting the user id = {id}", e);
                response.ErrorMessage = e.Message;
                return BadRequest();
            }
        }
    }
}
