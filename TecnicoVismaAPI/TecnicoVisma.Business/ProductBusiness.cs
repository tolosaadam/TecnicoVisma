using AutoMapper;
using System;
using System.Collections.Generic;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Interfaces;

namespace TecnicoVisma.Business
{
    public class ProductBusiness
    {
        public ProductBusiness(IProduct repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        private readonly IProduct _repository;
        private readonly IMapper _mapper;

        public int CountProduct()
        {
            return _repository.Count();
        }

        public ProductDTO GetProduct(int id)
        {
            var product = _repository.GetProduct(id);
            var productDTO = _mapper.Map<Product, ProductDTO>(product);
            return productDTO;

        }

        public IEnumerable<ProductDTO> GetAllProducts()
        {
            var products = _repository.GetProducts();
            var productsDTO = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            return productsDTO;
        }

        //public IEnumerable<ProductDTO> GetSimilarProductsByCategory(int id)
        //{
        //    var productGridDTO = _repository.GetProduct(id);
        //    var product = _mapper.Map<ProductGridDTO, Product>(productGridDTO);
        //    if (product != null)
        //    {
        //        var products = _repository.GetSimilarProducts(product);
        //        var productsDTO = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
        //        return productsDTO;
        //    }
        //    return null;
        //}

        public int CreateProduct(ProductDTO productDTO)
        {
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
            var response = _repository.Insert(product);
            return response;
        }

        public IEnumerable<ProductDTO> DeleteProduct(int id)
        {
            var products = _repository.Delete(id);
            var productsDTO = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            return productsDTO;
        }

        public IEnumerable<ProductDTO> UpdateProduct(ProductDTO productDTO)
        {
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
            var products = _repository.Update(product);
            var productsDTO = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            return productsDTO;
        }
    }
}
