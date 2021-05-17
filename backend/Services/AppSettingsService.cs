namespace Services
{
    using Models;
    using System.Threading.Tasks;

    public class AppSettingsService : IAppSettingsService
    {
        public AppSettingsService()
        {
        }

        public async Task<AppSettings> GetAsync()
        {
            return new AppSettings();
        }
    }
}
