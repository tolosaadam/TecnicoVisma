using System;
using System.Collections.Generic;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.Interfaces
{
    public interface IProduct
    {
        IEnumerable<Product> GetProducts();
        Product GetProduct(int id);
        IEnumerable<Product> Insert(Product product);
        IEnumerable<Product> Update(Product product);
        IEnumerable<Product> Delete(List<int> ids);
        decimal GetProductPriceById(int id);
        string GetProductNameById(int id);
        IEnumerable<Category> GetCategories();
        int Count();
    }
}
