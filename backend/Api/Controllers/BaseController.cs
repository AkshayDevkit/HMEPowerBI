namespace Api.Controllers
{
    using DotnetStandardQueryBuilder.Core;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Models;
    using Services;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public abstract class BaseController<T> : ControllerBase
        where T : BaseModel, new()
    {
        protected readonly IService<T> Service;

        protected BaseController(IService<T> service)
        {
            Service = service ?? throw new ArgumentNullException(nameof(service));
        }

        // [Authorize(Roles = "Admin")]
        [HttpGet]
        public virtual async Task<dynamic> GetAsync(string id = null)
        {
            if (!string.IsNullOrEmpty(id))
            {
                return new List<T>() { await Service.GetAsync(id).ConfigureAwait(false) }.FirstOrDefault();
            }

            var request = new DotnetStandardQueryBuilder.OData.UriParser(new DotnetStandardQueryBuilder.OData.UriParserSettings()).Parse<T>(Request.QueryString.ToString());

            if (request.Count)
            {
                return await Service.PaginateAsync(request).ConfigureAwait(false);
            }

            return await Service.GetAsync(request).ConfigureAwait(false);
        }

        [HttpGet("paginate")]
        public virtual async Task<IResponse<T>> PaginateAsync(int? pageSize = null, int page = 1)
        {
            return await Service.PaginateAsync(new Request { Count = true, Page = 1, PageSize = pageSize }).ConfigureAwait(false);
        }

        [HttpPost]
        public virtual async Task<T> CreateAsync(T skill)
        {
            return await Service.CreateAsync(skill).ConfigureAwait(false);
        }

        [HttpPost("createorupdate")]
        public virtual async Task CreateOrUpdateAsync(T t)
        {
            if (!string.IsNullOrEmpty(t.Id))
            {
                await UpdateAsync(t.Id, t).ConfigureAwait(false);
                return;
            }
            
            var request = new DotnetStandardQueryBuilder.OData.UriParser(new DotnetStandardQueryBuilder.OData.UriParserSettings()).Parse<T>(Request.QueryString.ToString());

            request.PageSize = 1;

            var items = await Service.GetAsync(request).ConfigureAwait(false);

            if (items.Count == 1)
            {
                await UpdateAsync(items.FirstOrDefault().Id, items.FirstOrDefault()).ConfigureAwait(false);
            }

            await CreateAsync(t).ConfigureAwait(false);
        }

        [HttpPut]
        public virtual async Task UpdateAsync(string id, T t)
        {
            if (string.IsNullOrEmpty(Convert.ToString(id)))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await Service.UpdateAsync(id, t).ConfigureAwait(false);
        }

        [HttpDelete]
        public virtual async Task DeleteAsync(string id)
        {
            if (string.IsNullOrEmpty(Convert.ToString(id)))
            {
                throw new ArgumentNullException(nameof(id));
            }

            await Service.RemoveAsync(id).ConfigureAwait(false);
        }

        [HttpGet("export")]
        public async Task<ApiFile> DownloadFile()
        {
            var request = new DotnetStandardQueryBuilder.OData.UriParser(new DotnetStandardQueryBuilder.OData.UriParserSettings()).Parse<T>(Request.QueryString.ToString());

            request.Count = false;

            return await Service.ExportAsync(request).ConfigureAwait(false);
        }
    }
}
