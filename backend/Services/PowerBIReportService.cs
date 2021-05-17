namespace Services
{
    using Configuration.Options;
    using Microsoft.IdentityModel.Clients.ActiveDirectory;
    using Microsoft.PowerBI.Api;
    using Microsoft.PowerBI.Api.Models;
    using Microsoft.Rest;
    using Models;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Http;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    public class PowerBIReportService : IPowerBIReportService
    {
        protected IPowerBIOptions PowerBIOptions { get; set; }

        public PowerBIReportService(IPowerBIOptions powerBIOptions)
        {
            PowerBIOptions = powerBIOptions ?? throw new ArgumentNullException(nameof(powerBIOptions));
        }

        public async Task<List<PowerBiReportGroups>> GetAsync(List<RoleApp> roleApps)
        {
            var embedConfig = new EmbedConfig();

            // Get token credentials for user
            var tokenCredentials = await GetTokenCredentialsAsyncOrThrow();

            // Create a Power BI Client object. It will be used to call Power BI APIs.
            using var client = new PowerBIClient(new Uri(PowerBIOptions.ApiUrl), tokenCredentials);

            var workSpaceGroups = client.Groups.GetGroups().Value;

            var loggedInUserRole = string.Empty;

            var powerBiReportGroups = new List<PowerBiReportGroups>();

            var authorizedWorkspaceGroups = workSpaceGroups.Where(group => roleApps.Any(role => role.Apps.Contains(group.Name)));

            foreach (var group in authorizedWorkspaceGroups)
                // .Where(group => group.Name.Equals(PowerBI.Sales) || group.Name.Equals(PowerBI.HumanResource)))
            {
                var powerBiReportGroup = new PowerBiReportGroups
                {
                    WorkspaceId = group.Id,
                    WorkspaceName = group.Name
                };

                // Get a list of reports.
                var reports = await client.Reports.GetReportsInGroupAsync(group.Id).ConfigureAwait(false);
                powerBiReportGroup.Reports = reports.Value.ToList();

                powerBiReportGroups.Add(powerBiReportGroup);
            }

            return powerBiReportGroups;
        }

        public async Task<EmbedConfig> GetEmbedConfigAsync(Guid workSpaceId, Guid reportId)
        {
            var embedConfig = new EmbedConfig();

            var tokenCredentials = await GetTokenCredentialsAsyncOrThrow().ConfigureAwait(false);

            // Create a Power BI Client object. It will be used to call Power BI APIs.
            using var client = new PowerBIClient(new Uri(PowerBIOptions.ApiUrl), tokenCredentials);

            // Get a list of reports.
            var reports = await client.Reports.GetReportsInGroupAsync(workSpaceId).ConfigureAwait(false);

            // var workSpaceGroups = client.Groups.GetGroups();

            // No reports retrieved for the given workspace.
            if (reports.Value.Count == 0)
            {
                throw new Exception(Error.NoReportsFound);
            }

            var report = reports.Value.Where(r => r.Id == reportId).OrderBy(obj => obj.Name).FirstOrDefault();

            var generateTokenRequestParameters = new GenerateTokenRequest(accessLevel: "view");

            var tokenResponse = await client.Reports.GenerateTokenInGroupAsync(workSpaceId, reportId, generateTokenRequestParameters).ConfigureAwait(false);

            // Generate Embed Configuration.
            embedConfig.EmbedToken = tokenResponse ?? throw new Exception(Error.FailedToGenerateEmbedToken);
            embedConfig.EmbedUrl = report.EmbedUrl;
            embedConfig.Id = report.Id;
            embedConfig.ReportName = report.Name;
            embedConfig.Reports = reports.Value.OrderBy(obj => obj.Name).ToList();

            return embedConfig;
        }

        private async Task<TokenCredentials> GetTokenCredentialsAsyncOrThrow()
        {
            try
            {
                var accessToken = await AcquireTokenAsync().ConfigureAwait(false);

                if (accessToken == null)
                {
                    throw new Exception(Error.AuthenticationFailed);
                }

                return new TokenCredentials(accessToken, "Bearer");
            }
            catch (AggregateException exception)
            {
                throw new Exception(exception.InnerException.Message);
            }
        }

        private async Task<string> AcquireTokenAsync()
        {
            if (PowerBIOptions.AuthenticationType == PowerBIAuthenticationType.MasterUser)
            {
                var authenticationContext = new AuthenticationContext(PowerBIOptions.AuthorityUrl);

                // Authentication using master user credentials
                // var cred = UserPasswordCredential(PowerBIOptions.PbiUsername, PowerBIOptions.PbiPassword);

                var token = await AcquireTokenAsync(PowerBIOptions.PbiUsername, PowerBIOptions.PbiPassword);

                return token;

                var credential = new UserCredential(PowerBIOptions.PbiUsername);

                return authenticationContext.AcquireTokenAsync(PowerBIOptions.ResourceUrl, PowerBIOptions.ApplicationId, credential).Result.AccessToken;
            }
            else
            {
                // For app only authentication, we need the specific tenant id in the authority url
                // var tenantSpecificURL = PowerBIOptions.AuthorityUrl.Replace("common", PowerBIOptions.Tenant);

                // var tenantSpecificURL = PowerBIOptions.AuthorityUrl.Replace("common", PowerBIOptions.Tenant);
                var authenticationContext = new AuthenticationContext(PowerBIOptions.AuthorityUrl);

                // Authentication using app credentials
                var credential = new ClientCredential(PowerBIOptions.ApplicationId, PowerBIOptions.ApplicationSecret);

                return (await authenticationContext.AcquireTokenAsync(PowerBIOptions.ResourceUrl, credential)).AccessToken;
            }
        }

        private async Task<string> AcquireTokenAsync(string username, string password)
        {
            HttpClient client = new HttpClient();

            string tokenEndpoint = string.Format("https://login.microsoftonline.com/{0}/oauth2/token", PowerBIOptions.TenantId);

            // string tokenEndpoint = PowerBIOptions.AuthorityUrl;

            var body = $"resource={PowerBIOptions.ResourceUrl}&client_id={PowerBIOptions.ApplicationId}&grant_type=password&username={username}&password={password}&reponse_type=code";
            var stringContent = new StringContent(body, Encoding.UTF8, "application/x-www-form-urlencoded");

            var result = await client.PostAsync(tokenEndpoint, stringContent).ContinueWith<string>((response) =>
            {
                return response.Result.Content.ReadAsStringAsync().Result;
            }).ConfigureAwait(false);

            var jobject = JObject.Parse(result);

            var token = jobject["access_token"].Value<string>();

            return token;
        }

        private static string GetUserRole(ClaimsIdentity currentuser)
        {
            if (currentuser.IsAuthenticated && currentuser.Claims != null)
            {
                var userIdentityClaim = currentuser.Claims.ToList();
                //string userRole = userIdentityClaim.Where(obj => obj.Type.Equals("Airline")).Select(obj => obj.Value).FirstOrDefault();

                var userRole = userIdentityClaim.Where(obj => obj.Type.Equals(ClaimTypes.Role)).Select(obj => obj.Value);

                return userRole.FirstOrDefault();
            }
            return null;
        }
    }
}
