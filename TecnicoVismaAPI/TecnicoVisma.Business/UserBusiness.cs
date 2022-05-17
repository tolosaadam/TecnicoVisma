using AutoMapper;
using Microsoft.Extensions.Configuration;
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
    public class UserBusiness
    {
        public UserBusiness(IConfiguration configuration, IUser repository, IMapper mapper, IJWTAuthenticationManager jwtManager)
        {
            _repository = repository;
            _mapper = mapper;
            _jwtManager = jwtManager;
            _configuration = configuration;
        }
        private readonly IUser _repository;
        private readonly IMapper _mapper;
        private readonly IJWTAuthenticationManager _jwtManager;
        private readonly IConfiguration _configuration;


        public ResponseLoginDTO AuthenticateUser(AuthenticateDTO authenticateDTO)
        {
            ResponseLoginDTO response = new();
            if (_repository.CheckUserAvailabity(authenticateDTO.MailAddress) != null)
            {
                if (_repository.AuthenticateUser(authenticateDTO) != null)
                {
                    var user = _mapper.Map<User, UserDTO>(_repository.AuthenticateUser(authenticateDTO));
                    response.Token = _jwtManager.GenerateToken(user.MailAddress);
                    response.Message = "Valid User";
                    response.Status = true;
                    response.User = user;
                    response.SessionTime = Convert.ToInt32(_configuration["Jwt:SessionTime"]);
                    
                }
                else
                {
                    response.Message = "Incorrect Password";
                    response.Status = false;
                }

            }
            else
            {
                response.Message = "Invalid Username";
                response.Status = false;
            }
            return response;
        }

        public List<string> GetAllMailAddresses()
        {
            return _repository.GetAllMailAddresses();
        }

        public UserDTO CreateUser(UserDTO userDTO)
        {
            var user = _mapper.Map<UserDTO, User>(userDTO);
            var response = _repository.Insert(user);
            var responseUserDTO = _mapper.Map<User, UserDTO>(response);
            return responseUserDTO;
        }
    }
}
