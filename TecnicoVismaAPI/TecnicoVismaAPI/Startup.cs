using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TecnicoVisma.Business;
using TecnicoVisma.Entities.Data;
using TecnicoVisma.Interfaces;
using TecnicoVisma.JWTAuthenticationManager;
using TecnicoVisma.MapperProfiles;
using TecnicoVisma.Repositories;

namespace TecnicoVismaAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {


            
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])),
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidAudience = Configuration["Jwt:Audience"],
                    ValidIssuer = Configuration["Jwt:Issuer"],

                    ClockSkew = Debugger.IsAttached ? TimeSpan.Zero : TimeSpan.FromMinutes(5)
                };
            });

            services.AddCors();
            services.AddDbContext<TecnicoVismaDBContext>(options => options.UseMySql(Configuration.GetConnectionString("DefaultConnection"), Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.0-mysql")));
            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TecnicoVismaAPI", Version = "v1" });
            });

            services.AddScoped<ProductBusiness>();
            services.AddScoped<IProduct, ProductRepository>();
            services.AddScoped<UserBusiness>();
            services.AddScoped<IUser, UserRepository>();
            services.AddScoped<CustomerBusiness>();
            services.AddScoped<ICustomer, CustomerRepository>();
            services.AddScoped<OrderDetailsBusiness>();
            services.AddScoped<IOrderDetails, OrderDetailsRepository>();
            services.AddScoped<OrderBusiness>();
            services.AddScoped<IOrder, OrderRepository>();
            services.AddScoped<IJWTAuthenticationManager, JWTAuthenticationManager>();

            var config = new MapperConfiguration(cfg => {
                cfg.AddProfile(new ProductProfile());
                cfg.AddProfile(new UserProfile());
                cfg.AddProfile(new CustomerProfile());
                cfg.AddProfile(new OrderProfile());
                cfg.AddProfile(new OrderDetailsProfile());
                cfg.AddProfile(new CategoryProfile());
            });
            IMapper mapper = config.CreateMapper();
            services.AddSingleton(mapper);

            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue;
                x.MemoryBufferThreshold = int.MaxValue;
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "TecnicoVismaAPI v1"));
            }

            app.UseCors(builder =>
            {
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowAnyOrigin();
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });


            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
