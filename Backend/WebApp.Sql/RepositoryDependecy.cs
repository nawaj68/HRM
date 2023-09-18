using Microsoft.Extensions.DependencyInjection;
using WebApp.Core.Sqls;

namespace WebApp.Sql
{
    public static class RepositoryDependency
    {
        public static void AddRepositoryDependency(this IServiceCollection services)
        {
            services.AddScoped(typeof(ISqlRepository<>), typeof(SqlRepository<>));
            //services.AddScoped<IRequestLogRepository, RequestLogRepository>();
        }
    }
}
