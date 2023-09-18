using WebApp.Service.Models;
using WebApp.Service.Models.Enrols;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserBasicInformationModel : MasterModel
    {
        public long UserInformationId { get; set; }

        public string AboutMe { get; set; }

        public UserInformationModel UserInformation { get; set; }
    }
}
