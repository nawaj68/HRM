namespace WebApp.Sql.Entities.Enrols
{
    public class UserEducationalInformation : BaseEntity
    {
        public long UserInformationId { get; set; }

        public string Degree { get; set; }
        public string Institute { get; set; }
        public string PassingYear { get; set; }
        public string Score { get; set; }
        public string OutOfScore { get; set; }

        public UserInformation UserInformation { get; set; }
    }
}
