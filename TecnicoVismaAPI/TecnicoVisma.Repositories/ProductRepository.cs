﻿using Microsoft.EntityFrameworkCore;
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
            var products = _context.Products.AsNoTracking().Include(x => x.Category).ToList();
            return products;
        }

        public Product GetProduct(int id)
        {
            var product = _context.Products.FirstOrDefault(x => x.Id == id);
            return product;         
        }

        public IEnumerable<Product> Insert(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return GetProducts();
        }

        public IEnumerable<Product> Update(Product product)
        {
            _context.Products.Update(product);
            _context.SaveChanges();
            return GetProducts();
        }

        public decimal GetProductPriceById(int id)
        {
            var price = _context.Products.FirstOrDefault(x => x.Id == id).UnitPrice;
            return price;
                //db.Items.Where(x => x.userid == user_ID).Select(x => x.Id).Distinct();
        }

        public string GetProductNameById(int id)
        {
            var name = _context.Products.FirstOrDefault(x => x.Id == id).Name;
            return name;
        }

        public IEnumerable<Category> GetCategories()
        {
            var categories = _context.Categories.ToList();
            return categories;
        }
    }
}
