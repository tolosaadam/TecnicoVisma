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
            CreateMap<Product, ProductDTO>();
            CreateMap<ProductDTO, Product>();
            //.ForMember(src => src.Category, option => option.MapFrom(dest => dest.Category.CategoryName))
            //.ForMember(src => src.Brand, option => option.MapFrom(dest => dest.Brand.BrandName));
        }
    }
}
