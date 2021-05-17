namespace Repositories
{
    using Configuration.Options;
    using Models;
    
    public class RoleAppRepository : BaseRepository<RoleApp>, IRoleAppRepository
    {
        public RoleAppRepository(IDbOptions dbOptions)
            : base(dbOptions, "roleapps")
        {
        }
    }
}
