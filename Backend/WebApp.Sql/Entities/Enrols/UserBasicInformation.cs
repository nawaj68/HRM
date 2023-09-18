using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserBasicInformation : BaseEntity
    {
        public long UserInformationId { get; set; }
        public string AboutMe { get; set; }

        public UserInformation UserInformation { get; set; }
    }
}
