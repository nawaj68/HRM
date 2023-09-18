using WebApp.Service.Models;
using WebApp.Service.Models.Enrols;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserCertificationModel : MasterModel
    {
        public long UserInformationId { get; set; }

        public string Title { get; set; }
        public string Institute { get; set; }
        public string PassingYear { get; set; }

        public UserInformationModel UserInformation { get; set; }
    }
}
