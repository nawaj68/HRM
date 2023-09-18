using WebApp.Service.Models;
using WebApp.Service.Models.Enrols;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserProfessionalInformationModel : MasterModel
    {
        public long UserInformationId { get; set; }

        public string Designation { get; set; }
        public string Organization { get; set; }
        public string JoiningDate { get; set; }
        public string EndingDate { get; set; }
        public bool IsCurrent { get; set; }
        public string Responsibilities { get; set; }

        public UserInformationModel UserInformation { get; set; }
    }
}
