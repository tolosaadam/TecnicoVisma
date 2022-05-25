using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TecnicoVisma.Entities.Migrations
{
    public partial class UserDataAdminMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Address", "Birthday", "Country", "FilePath", "FirstName", "Gender", "LastName", "MailAddress", "Password", "PostalCode", "RegisteredDate" },
                values: new object[] { 1, "asd 1234", DateTime.Parse(DateTime.Now.ToString("yyy-MM-dd H:mm:ss")), null, "", "Admin", "Anonymous", "Admin", "admin@admin.com", "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918", "1234", DateTime.Parse(DateTime.Now.ToString("yyy-MM-dd H:mm:ss")) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Clothes" },
                    { 2, "Home" },
                    { 3, "Electronic" },
                    { 4, "Software" },
                    { 5, "Video Games" },
                    { 6, "Vehicles" },
                    { 7, "Footwear" }
                });
        }
    }
}
