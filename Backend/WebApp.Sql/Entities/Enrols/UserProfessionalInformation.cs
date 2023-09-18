namespace WebApp.Sql.Entities.Enrols
{
    public class UserProfessionalInformation : BaseEntity
    {
        public long UserInformationId { get; set; }

        public string Designation { get; set; }
        public string Organization { get; set; }
        public string JoiningDate { get; set; }
        public string EndingDate { get; set; }
        public bool IsCurrent { get; set; }
        public string Responsibilities { get; set; }

        public UserInformation UserInformation { get; set; }
    }
}
