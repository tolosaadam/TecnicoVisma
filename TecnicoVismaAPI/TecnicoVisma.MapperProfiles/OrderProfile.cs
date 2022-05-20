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
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDTO>();
            CreateMap<OrderDTO, Order>()
                .ForMember(src => src.DateOfOrder, option => option.MapFrom(dest => DateTime.Now.ToString("yyyy-MM-dd H:mm:ss")));
        }
    }
}
