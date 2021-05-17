namespace Api.Controllers
{
    using DotnetStandardQueryBuilder.Core;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;
    using System;
    using System.Linq;
    using System.Security.Claims;
    using System.Threading.Tasks;

    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class PowerBIController : ControllerBase
    {
        private readonly IPowerBIReportService _powerBIService;

        private readonly IRoleAppService _roleAppService;

        public PowerBIController(IPowerBIReportService powerBIService, IRoleAppService roleAppService)
        {
            _powerBIService = powerBIService ?? throw new ArgumentNullException(nameof(powerBIService));
            _roleAppService = roleAppService ?? throw new ArgumentNullException(nameof(roleAppService));
        }

        [HttpGet]
        public virtual async Task<dynamic> GetAsync(Guid? workSpaceId, Guid? reportId)
        {
            // var userId = Request.HttpContext.User.Claims.Where(x => x.Type == "Id").FirstOrDefault()?.Value;
            
            var roles = Request.HttpContext.User.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value).ToList();

            /*
             * new Request
            {
                Filter = new Filter
                {
                    Operator = FilterOperator.IsContainedIn,
                    Property = nameof(RoleApp.Role),
                    Value = roles
                }
            })
             * */

            var apps = (await _roleAppService.GetAsync(new Request
            {
                Filter = new Filter
                {
                    Operator = FilterOperator.IsContainedIn,
                    Property = nameof(RoleApp.Role),
                    Value = roles
                }
            })).ToList();

            if (workSpaceId.HasValue && reportId.HasValue)
            {
                return await _powerBIService.GetEmbedConfigAsync(workSpaceId.Value, reportId.Value).ConfigureAwait(false);
            }

            return await _powerBIService.GetAsync(apps).ConfigureAwait(false);
        }
    }
}
