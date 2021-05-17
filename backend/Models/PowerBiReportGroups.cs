namespace Models
{
    using Microsoft.PowerBI.Api.Models;
    using System;
    using System.Collections.Generic;
    
    public class PowerBiReportGroups
    {
        public Guid WorkspaceId { get; set; }

        public string WorkspaceName { get; set; }

        public Guid? ReportId { get; set; }

        public string EmbedUrl { get; set; }

        public EmbedToken EmbedToken { get; set; }

        public List<Microsoft.PowerBI.Api.Models.Report> Reports { get; set; }
    }
}
