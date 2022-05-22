using AutoMapper;
using System;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.MapperProfiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDTO>()
                .ForMember(src => src.CategoryName, option => option.MapFrom(dest => dest.Category.Name));
            CreateMap<ProductDTO, Product>();
        }
    }
}
