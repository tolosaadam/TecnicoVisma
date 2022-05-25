using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TecnicoVisma.Entities.Migrations
{
    public partial class FixDataSeedMigrations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Birthday", "RegisteredDate" },
                values: new object[] { DateTime.Parse(DateTime.Now.ToString("yyy-MM-dd H:mm:ss")), DateTime.Parse(DateTime.Now.ToString("yyy-MM-dd H:mm:ss")) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Birthday", "RegisteredDate" },
                values: new object[] { new DateTime(2022, 5, 25, 13, 15, 0, 0, DateTimeKind.Unspecified), new DateTime(2022, 5, 25, 13, 15, 0, 0, DateTimeKind.Unspecified) });
        }
    }
}
