namespace Repositories
{
    using Configuration.Options;
    using Models;
    using Repositories;

    public class ReportRepository : BaseRepository<Report>, IReportRepository
    {
        public ReportRepository(IDbOptions dbOptions)
            : base(dbOptions, "products")
        {
        }
    }
}
