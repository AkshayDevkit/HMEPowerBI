namespace Configuration.Options
{
    public interface IPowerBIOptions
    {
        PowerBIAuthenticationType AuthenticationType { get; set; }

        string TenantId { get; set; }

        string ApplicationId { get; set; }

        string MCCWorkspaceId { get; set; }

        string AirlineWorkspaceId { get; set; }

        string ReportId { get; set; }

        string AuthorityUrl { get; set; }

        string ResourceUrl { get; set; }

        string ApiUrl { get; set; }

        string EmbedUrlBase { get; set; }

        string ApplicationSecret { get; set; }

        string GenTokenUrl { get; set; }

        string PbiUsername { get; set; }

        string PbiPassword { get; set; }
    }
}
