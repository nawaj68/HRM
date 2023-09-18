using WebApp.Core.Sqls;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Repositories
{
    public class UserPersonalInformationRepository : SqlRepository<UserInformation>, IUserPersonalInformationRepository
    {
        public UserPersonalInformationRepository(WebAppContext context) : base(context)
        {
        }
    }
}
