namespace Api
{
    using Common.Middleware;
    using Configuration.Options;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.Hosting;
    using Microsoft.Extensions.Logging;
    using Microsoft.Extensions.Options;
    using Microsoft.Identity.Web;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.OpenApi.Models;
    using Serilog;
    using Services;
    using System.Text;
    using ConfigurationBuilder = Microsoft.Extensions.Configuration.ConfigurationBuilder;
    using IApplicationLifetime = Microsoft.Extensions.Hosting.IApplicationLifetime;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            // Configuration = configuration;

            var builder = new ConfigurationBuilder().AddConfiguration(configuration);

            /* Add Default configurations */
            builder.AddConfiguration(configuration);

            /* Add Custom configurations */
            // adding cache.json which contains cachemanager configuration(s)
            var appOptions = configuration.GetSection(nameof(AppOptions)).Get<AppOptions>();
            if (true || appOptions.Cache)
            {
                builder.AddJsonFile("cache.json");
            }
            Configuration = builder.Build();

            /*
            // For manual for like console app.            
            var builder = new Microsoft.Extensions.Configuration.ConfigurationBuilder().AddJsonFile("cache.json");
            Configuration = builder.Build();
            
            // var cacheConfiguration = Configuration.GetCacheConfiguration();
            var cacheConfiguration =
                Configuration.GetCacheConfiguration("retaileasy_cache")
                    .Builder
                    .WithMicrosoftLogging(f =>
                    {
                        f.AddSerilog();
                        // f.AddDebug(LogLevel.Information);
                    })
                    .Build();
            */

            SetupLogging(Configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Configurations
            var appOptionsSection = Configuration.GetSection(nameof(AppOptions));
            var appOptions = appOptionsSection.Get<AppOptions>();
            services.Configure<AppOptions>(appOptionsSection);
            services.Configure<MongoDbOptions>(Configuration.GetSection(nameof(MongoDbOptions)));
            services.Configure<PowerBIOptions>(Configuration.GetSection(nameof(PowerBIOptions)));
            services.AddSingleton<IAppOptions>(options => options.GetRequiredService<IOptions<AppOptions>>().Value);
            services.AddSingleton<IDbOptions>(options => options.GetRequiredService<IOptions<MongoDbOptions>>().Value);
            services.AddSingleton<IPowerBIOptions>(options => options.GetRequiredService<IOptions<PowerBIOptions>>().Value);

            services.AddLogging(c => c.AddConsole().AddDebug().AddConfiguration(Configuration));

            // Enable Caching
            if (true || appOptions.Cache)
            {
                // Cache manager
                // using the new overload which adds a singleton of the configuration to services and the configure method to add logging
                // TODO: still not 100% happy with the logging part
                // services.AddCacheManagerConfiguration(Configuration, cfg => cfg.WithMicrosoftLogging(services));
                services.AddCacheManagerConfiguration(Configuration);

                // uses a refined configurastion (this will not log, as we added the MS Logger only to the configuration above
                // services.AddCacheManager<int>(Configuration, configure: builder => builder.WithJsonSerializer());
                // creates a completely new configuration for this instance (also not logging)
                // services.AddCacheManager<DateTime>(inline => inline.WithDictionaryHandle());

                // any other type will be  Configurastion used will be the one defined by AddCacheManagerConfiguration earlier.
                services.AddCacheManager();
            }

            // ------ Authentication --------

            // -- Direct web api authentication --
            // services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApp(Configuration.GetSection("AzureAd"));
            // -- End direct web api authentication --
            // Azure AD Auth
            // services.AddMicrosoftIdentityWebApiAuthentication(Configuration, "AzureAd", "Bearer", true);

            // -- JWT web api authentication --
            // Use below for JWT web api authentication from authentication header
            // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(Configuration.GetSection("AzureAd"));

            // custom configure jwt authentication
            var key = Encoding.ASCII.GetBytes(appOptions.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                x.SaveToken = true;
            });
            /* End Customization */

            // -- End JWT web api authentication --

            // ------ End Authentication --------

            services.AddControllers().AddNewtonsoftJson();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api", Version = "v1" });
            });

            // Services/Repositories Configurations
            services.ConfigureServices(appOptions);

            // OData
            // services.AddOData();
            // services.AddMvc(options => options.EnableEndpointRouting = false);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory, IApplicationLifetime appLifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Api v1"));
            }

            loggerFactory.AddSerilog();
            appLifetime.ApplicationStopped.Register(Log.CloseAndFlush);

            app.UseHttpsRedirection();

            app.UseRouting();

            // ----- CORS ----
            // app.UseCors();
            
            // global cors policy
            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            /* Enable
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                      builder =>
                      {
                          builder.
                               AllowAnyHeader().
                               AllowAnyMethod().
                               AllowCredentials().

                          WithOrigins(Configuration.GetSection("CORS:ConnectionString").Get<string>());

                          builder.Build();
                      });
            });

            --- END CORS ---
            */

            // Logging
            app.UseMiddleware<RequestLoggingMiddleware>();

            // Authentication
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // odata
                // endpoints.Select().Filter().OrderBy().Count().MaxTop(10);
                // endpoints.EnableDependencyInjection();//This guy solves the problem
                // endpoints.MapODataRoute("odata", "odata", GetEdmModel());
            });
        }

        private static void SetupLogging(IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                        .Enrich.FromLogContext()
                        .ReadFrom.Configuration(configuration)
                        .CreateLogger();
        }
    }
}
