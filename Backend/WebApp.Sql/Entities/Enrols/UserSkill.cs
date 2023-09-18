using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserSkill : BaseEntity
    {
        public long UserInformationId { get; set; }
        public long SkillId { get; set; }

        public UserInformation UserInformation { get; set; }
        public Skill Skill { get; set; }
    }
}
