namespace Services
{
    using Configuration.Options;
    using Models;
    using Repositories;
    using System.Threading.Tasks;

    public class RoleAppService : BaseService<RoleApp>, IRoleAppService
    {
        public RoleAppService(IAppOptions appOptions, ICacheService<RoleApp> cacheService, IRoleAppRepository roleAppRepository)
            : base(appOptions, cacheService, roleAppRepository)
        {
        }

        protected async override Task<RoleApp> OnCreating(RoleApp t)
        {
            return await Task.FromResult(t).ConfigureAwait(false);
        }
    }
}
