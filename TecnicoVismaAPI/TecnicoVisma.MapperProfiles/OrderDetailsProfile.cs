using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.MapperProfiles
{
    public class OrderDetailsProfile : Profile
    {
        public OrderDetailsProfile()
        {
            CreateMap<OrderDetails, OrderDetailsDTO>();
            CreateMap<OrderDetailsDTO, OrderDetails>();
        }
    }
}
