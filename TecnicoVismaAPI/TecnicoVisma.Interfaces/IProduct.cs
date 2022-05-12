﻿using System;
using System.Collections.Generic;
using TecnicoVisma.Entities.DTOS;
using TecnicoVisma.Entities.Models;

namespace TecnicoVisma.Interfaces
{
    public interface IProduct
    {
        IEnumerable<Product> GetProducts();
        Product GetProduct(int id);
        int Insert(Product product);
        IEnumerable<Product> Update(Product product);
        IEnumerable<Product> Delete(int id);
        int Count();
        //IEnumerable<Product> GetSimilarProducts(Product product);
    }
}
