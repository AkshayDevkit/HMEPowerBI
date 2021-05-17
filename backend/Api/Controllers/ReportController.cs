namespace Api.Controllers
{
    using CacheManager.Core;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;
    using System;

    [ApiController]
    [Route("[controller]")]
    public class ReportController : BaseController<Report>
    {
        private readonly ICacheManager<string> _cache;

        public ReportController(IReportService designationService, ICacheManager<string> valuesCache)
            : base(designationService)
        {
            _cache = valuesCache;
            var value = _cache.Get("key");
            var a = _cache.Add("key", Guid.NewGuid().ToString());
        }
    }
}
