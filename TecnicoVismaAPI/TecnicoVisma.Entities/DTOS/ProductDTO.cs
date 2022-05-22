﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TecnicoVisma.Entities.DTOS
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public decimal UnitPrice { get; set; }
        public int? UnitsInStock { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        //public string ImagePath { get; set; }
    }
}
