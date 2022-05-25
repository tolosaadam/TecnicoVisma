using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Entities.Models;
using TecnicoVisma.Helpers;

namespace TecnicoVisma.Entities.Data
{
    public partial class TecnicoVismaDBContext: DbContext
    {
        public TecnicoVismaDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetails> OrdersDetails { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(x => x.Birthday).HasColumnType("date");
                entity.Property(x => x.RegisteredDate).HasColumnType("datetime");
                entity.HasData(
                       new
                       {
                           Id = 1,
                           FirstName = "Admin",
                           LastName = "Admin",
                           Birthday = DateTime.Parse(DateTime.Now.ToString("yyy-MM-dd H:mm:ss")),
                           RegisteredDate = DateTime.Parse(DateTime.Now.ToString("yyy-MM-dd H:mm:ss")),
                           Gender = "Anonymous",
                           PostalCode = "1234",
                           Address = "asd 1234",
                           MailAddress = "admin@admin.com",
                           Password = EncodingHelpers.EncodeTOsha256("admin"),
                           FilePath = ""
                       });
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(x => x.Birthday).HasColumnType("date");
                entity.Property(x => x.RegisteredDate).HasColumnType("datetime");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(x => x.DateOfOrder).HasColumnType("datetime");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasData(new Category { Id = 1, Name= "Clothes"});
                entity.HasData(new Category { Id = 2, Name = "Home" });
                entity.HasData(new Category { Id = 3, Name = "Electronic" });
                entity.HasData(new Category { Id = 4, Name = "Software" });
                entity.HasData(new Category { Id = 5, Name = "Video Games" });
                entity.HasData(new Category { Id = 6, Name = "Vehicles" });
                entity.HasData(new Category { Id = 7, Name = "Footwear" });
            });
        }
    }
}