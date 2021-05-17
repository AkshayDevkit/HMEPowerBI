namespace Services
{
    using Models;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public interface IPowerBIReportService
    {
        Task<List<PowerBiReportGroups>> GetAsync(List<RoleApp> roleApps);

        Task<EmbedConfig> GetEmbedConfigAsync(Guid workSpaceId, Guid reportId);
    }
}
