namespace Services
{
    using ClosedXML.Excel;
    using Configuration.Options;
    using DotnetStandardQueryBuilder.Core;
    using Models;
    using Repositories;
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;

    public abstract class BaseService<T>
        where T : BaseModel, new()
    {
        protected readonly IAppOptions AppOptions;

        protected readonly ICacheService<T> CacheService;

        protected readonly IRepository<T> Repository;

        protected BaseService(IAppOptions appOptions, ICacheService<T> cacheService, IRepository<T> repository)
        {
            AppOptions = appOptions ?? throw new ArgumentException(nameof(appOptions));
            Repository = repository ?? throw new ArgumentException(nameof(repository));
            CacheService = cacheService ?? throw new ArgumentException(nameof(cacheService));
        }

        public virtual async Task<List<T>> BulkCreateAsync(List<T> tList)
        {
            await OnBulkCreating(tList);

            return await Repository.BulkCreateAsync(tList);
        }

        public virtual async Task<List<string>> BulkRemoveAsync(List<string> ids)
        {
            return await Repository.BulkRemoveAsync(ids);
        }

        public virtual async Task<List<string>> BulkRemoveAsync(IFilter filter)
        {
            return await Repository.BulkRemoveAsync(filter);
        }

        public virtual async Task<List<string>> BulkUpdateAsync(List<T> tList)
        {
            await OnBulkUpdating(tList);

            return await Repository.BulkUpdateAsync(tList);
        }

        public virtual async Task<T> CreateAsync(T t)
        {
            await OnCreating(t);

            return await Repository.CreateAsync(t).ConfigureAwait(false);
        }

        public virtual async Task<List<T>> GetAsync(IRequest request = null)
        {
            return await Repository.GetAsync(request).ConfigureAwait(false);
        }

        public virtual async Task<T> GetAsync(string id)
        {
            return await Repository.GetAsync(id).ConfigureAwait(false);
        }

        public virtual async Task<List<T>> GetAsync(List<string> ids)
        {
            return await Repository.GetAsync(ids).ConfigureAwait(false);
        }

        public virtual async Task<T> GetOrThrowAsync(string id)
        {
            var item = await GetAsync(id).ConfigureAwait(false);
            if (item == null)
            {
                throw new Exception("Resource not found with Id " + id);
            }
            return item;
        }

        public virtual async Task<IResponse<T>> PaginateAsync(IRequest request)
        {
            return await Repository.PaginateAsync(request);
        }

        public virtual async Task<long> RemoveAsync(string id)
        {
            await OnDeleting(id).ConfigureAwait(false);

            return await Repository.RemoveAsync(id).ConfigureAwait(false);
        }

        public virtual async Task<string> UpdateAsync(string id, T t)
        {
            await OnUpdating(t).ConfigureAwait(false);

            return await Repository.UpdateAsync(id, t).ConfigureAwait(false);
        }

        public virtual async Task<ApiFile> ExportAsync(IRequest request = null)
        {
            var items = await GetAsync(request).ConfigureAwait(false);

            return null;

            // var excelService = new ExcelService();

            // return excelService.Export(items);
        }

        protected virtual async Task OnBulkCreating(List<T> tList)
        {
            foreach (var item in tList)
            {
                await OnCreating(item);
            }
        }

        protected virtual async Task OnBulkUpdating(List<T> tList)
        {
            foreach (var item in tList)
            {
                await OnUpdating(item);
            }
        }

        protected abstract Task<T> OnCreating(T t);

        protected virtual async Task OnDeleting(string id)
        {
            await Task.CompletedTask;
        }

        protected virtual async Task<T> OnUpdating(T t)
        {
            return await OnCreating(t);
        }
    }
}
