namespace WebApp.Sql.Entities.Enrols
{
    public class UserHobbyInformation : BaseEntity
    {
        public long UserInformationId { get; set; }

        public string Name { get; set; }

        public UserInformation UserInformation { get; set; }
    }
}
