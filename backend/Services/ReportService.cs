namespace Services
{
    using Configuration.Options;
    using FluentValidation;
    using Models;
    using Repositories;
    using System.Threading.Tasks;
    using Validators;

    public class ReportService : BaseService<Report>, IReportService
    {
        public ReportService(IAppOptions appOptions, ICacheService<Report> cacheService, IReportRepository reportRepository)
            : base(appOptions, cacheService, reportRepository)
        {
        }

        protected override Task<Report> OnCreating(Report report)
        {
            new ReportValidator().ValidateAndThrow(report);

            return Task.FromResult(report);
        }
    }
}
