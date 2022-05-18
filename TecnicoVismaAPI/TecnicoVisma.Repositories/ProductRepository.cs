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

        public IEnumerable<Product> Delete(List<int> ids)
        {
            _context.Products.RemoveRange(_context.Products.Where(x => ids.Contains(x.Id)));
            _context.SaveChanges();
            return GetProducts();
        }

        public IEnumerable<Product> GetProducts()
        {
            var products = _context.Products.ToList();
            return products;
        }

        public Product GetProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            return product;         
        }

        public IEnumerable<Product> Insert(Product product)
        {
            product.CategoryId = 1; // Para testing

            _context.Products.Add(product);
            _context.SaveChanges();
            return GetProducts();
        }

        public IEnumerable<Product> Update(Product product)
        {
            product.CategoryId = 1;
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
