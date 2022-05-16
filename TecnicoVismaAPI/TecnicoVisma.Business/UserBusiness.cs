using AutoMapper;
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
        public UserBusiness(IUser repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        private readonly IUser _repository;
        private readonly IMapper _mapper;


        //TODO RESPONSES DEL REGISTRY PARA CUANDO YA EXISTE EL EMAIL, RESPONSES DEL LOGIN PARA INVALID USERNAME O PASSWORD
        public ResponseLoginDTO AuthenticateUser(AuthenticateDTO authenticateDTO)
        {
            ResponseLoginDTO response = new();
            if (_repository.CheckUserAvailabity(authenticateDTO.MailAddress) != null)
            {
                if (_repository.AuthenticateUser(authenticateDTO) != null)
                {
                    response.Token = "";
                    response.Message = "Valid User";
                    response.Status = true;                                 
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

        public UserDTO CreateUser(UserDTO userDTO)
        {
            var user = _mapper.Map<UserDTO, User>(userDTO);
            var response = _repository.Insert(user);
            var responseUserDTO = _mapper.Map<User, UserDTO>(response);
            return responseUserDTO;
        }
    }
}
