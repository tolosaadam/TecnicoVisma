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

        public IEnumerable<ProductDTO> CreateProduct(ProductDTO productDTO)
        {
            var product = _mapper.Map<ProductDTO, Product>(productDTO);
            var products = _repository.Insert(product);
            var productsDTO = _mapper.Map<IEnumerable<Product>, IEnumerable<ProductDTO>>(products);
            return productsDTO;
        }

        public IEnumerable<ProductDTO> DeleteProduct(List<int> ids)
        {
            var products = _repository.Delete(ids);
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

        public  decimal GetProductPrice(int id)
        {
            return _repository.GetProductPriceById(id);
        }

        public string GetProductName(int id)
        {
            return _repository.GetProductNameById(id);
        }

        public IEnumerable<CategoryDTO> GetCategories()
        {
            var categories = _repository.GetCategories();
            var categoriesDTO = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryDTO>>(categories);
            return categoriesDTO;
        }

        public bool ValidateProductsStock(List<ProductStockValidator> productsToCheck)
        {
            foreach(ProductStockValidator productToCheck in productsToCheck)
            {
                var product = GetProduct(productToCheck.Id);
                if(product.UnitsInStock < productToCheck.ProductQuantity)
                {
                    return false;
                }
            }
            return true;
        }

        public void DeleteProductsFromStock(List<ProductStockValidator> productsToCheck)
        {
            foreach(ProductStockValidator productToCheck in productsToCheck)
            {
                var product = _repository.GetProduct(productToCheck.Id);
                product.UnitsInStock -= productToCheck.ProductQuantity;
                _repository.Update(product);
            }
        }
    }
}
