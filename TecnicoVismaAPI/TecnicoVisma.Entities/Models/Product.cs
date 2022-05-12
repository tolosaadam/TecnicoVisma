using System;

namespace TecnicoVisma.Entities.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public decimal UnitPrice { get; set; }
        public int? UnitsInStock { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
        //public int BrandId { get; set; }
        //public string ImagePath { get; set; }
        //public virtual ICollection<CartItem> CartItems { get; set; }
        //public virtual OrderDetails OrderDetails { get; set; }
        //public virtual Brand Brand { get; set; }
    }
}
