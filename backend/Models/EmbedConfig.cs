namespace Models
{
    using Microsoft.PowerBI.Api.Models;
    using System;
    using System.Collections.Generic;
    
    public class EmbedConfig
    {
        public Guid Id { get; set; }

        public string EmbedUrl { get; set; }

        public EmbedToken EmbedToken { get; set; }

        public string ReportName { get; set; }

        public List<Microsoft.PowerBI.Api.Models.Report> Reports { get; set; }

        public int MinutesToExpiration
        {
            get
            {
                var minutesToExpiration = EmbedToken.Expiration - DateTime.UtcNow;
                return (int)minutesToExpiration.TotalMinutes;
            }
        }

        public bool? IsEffectiveIdentityRolesRequired { get; set; }

        public bool? IsEffectiveIdentityRequired { get; set; }

        public bool EnableRLS { get; set; }

        public string Username { get; set; }

        public string Roles { get; set; }

        public string ErrorMessage { get; internal set; }
    }
}
