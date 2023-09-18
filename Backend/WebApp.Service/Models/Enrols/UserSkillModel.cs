using WebApp.Service.Models;
using WebApp.Service.Models.Enrols;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserSkillModel : MasterModel
    {
        public long UserInformationId { get; set; }
        public long SkillId { get; set; }

        public UserInformationModel UserInformation { get; set; }
        public SkillModel Skill { get; set; }
    }
}
