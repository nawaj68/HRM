using WebApp.Service.Models;
using WebApp.Service.Models.Enrols;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserHobbyInformationModel : MasterModel
    {
        public long UserInformationId { get; set; }

        public string Name { get; set; }

        public UserInformationModel UserInformation { get; set; }
    }
}
