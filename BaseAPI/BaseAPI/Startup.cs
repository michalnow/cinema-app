using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using BaseAPI.Models;
using Microsoft.AspNetCore.Mvc.Cors.Internal;

namespace BaseAPI
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

            //services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            //{
            //    builder.AllowAnyOrigin()
            //           .AllowAnyMethod()
            //           .AllowAnyHeader();
            //}));
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddDbContext<DataBaseContext>( options =>
                options.UseMySQL(Configuration.GetConnectionString("DefaultConnection")));

            //services.Configure<MvcOptions>(options =>
            //{
            //    options.Filters.Add(new CorsAuthorizationFilterFactory("MyPolicy"));
            //});
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
    //        app.UseCors(builder => builder
    //.AllowAnyOrigin()
    //.AllowAnyMethod()
    //.AllowAnyHeader());
    
            app.UseCors("CorsPolicy");
            if (env.IsDevelopment())
                app.UseDeveloperExceptionPage();
            else      
                app.UseHsts();

            
            app.UseMvc();
        }
    }
}
