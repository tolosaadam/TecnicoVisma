using System;
using System.Collections.Generic;
using System.Linq;
using TecnicoVisma.Entities.Data;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Interfaces;

namespace TecnicoVisma.Repositories
{
    public class ProductRepository : IProduct
    {
        private readonly TecnicoVismaDBContext _context;
        public ProductRepository(TecnicoVismaDBContext context)
        {
            _context = context;
        }
        public int Count()
        {
            return _context.Products.Count();
        }

        public IEnumerable<Product> Delete(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
                return GetProducts();
            }
            return null;
        }

        public IEnumerable<Product> GetProducts()
        {
            var products = _context.Products.ToList();
            //var products = _context.Products.ProjectTo<ProductGridDTO>(_mapper.ConfigurationProvider).ToList();  //TODO  CHECK THIS
            return products;
        }

        public Product GetProduct(int id)
        {
            //var product = _context.Products.ProjectTo<ProductGridDTO>(_mapper.ConfigurationProvider).FirstOrDefault(x => x.Id == id);
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            return product;         
        }

        public int Insert(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return 1;
        }

        public IEnumerable<Product> Update(Product product)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
            return GetProducts();
        }

        //public IEnumerable<Product> GetSimilarProducts(Product product)
        //{
        //    var products = _context.Products.Where(x => x.Category.Id == product.Category.Id && x.Id != product.Id);
        //    return products;
        //}
    }
}
