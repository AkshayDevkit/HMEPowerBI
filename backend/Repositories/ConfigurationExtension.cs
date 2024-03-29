﻿namespace Repositories
{
    using Microsoft.Extensions.DependencyInjection;
    using MongoDB.Bson.Serialization.Conventions;

    public static class ConfigurationExtension
    {
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            // For MongoDb Conventions
            
            
            // camelcase names
            ConventionRegistry.Register(nameof(CamelCaseElementNameConvention), new ConventionPack { new CamelCaseElementNameConvention() }, _ => true);

            // ignore if default value is default type value
            ConventionRegistry.Register("IgnoreIfDefault", new ConventionPack { new IgnoreIfDefaultConvention(true) }, t => true);

            // End

            services.AddScoped<IReportRepository, ReportRepository>();
            services.AddScoped<IRoleAppRepository, RoleAppRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserNotificationRepository, UserNotificationRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();
            services.AddScoped<ITrackerRepository, TrackerRepository>();

            return services;
        }
    }
}
