namespace WebApp.Sql.Entities.Enrols
{
    public class UserCertification : BaseEntity
    {
        public long UserInformationId { get; set; }

        public string Title { get; set; }
        public string Institute { get; set; }
        public string PassingYear { get; set; }

        public UserInformation UserInformation { get; set; }
    }
}
