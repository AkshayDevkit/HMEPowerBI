namespace Configuration.Options
{
    public class PowerBIOptions : IPowerBIOptions
    {
        public PowerBIAuthenticationType AuthenticationType { get; set; }

        public string TenantId { get; set; }
        
        public string ApplicationId { get; set; }

        public string MCCWorkspaceId { get; set; }

        public string AirlineWorkspaceId { get; set; }

        public string ReportId { get; set; }

        public string AuthorityUrl { get; set; }

        public string ResourceUrl { get; set; }

        public string ApiUrl { get; set; }

        public string EmbedUrlBase { get; set; }

        public string ApplicationSecret { get; set; }

        public string GenTokenUrl { get; set; }

        public string PbiUsername { get; set; }

        public string PbiPassword { get; set; }
    }
}
