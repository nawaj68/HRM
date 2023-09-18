using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserAddressInformation : BaseEntity
    {
        public long UserInformationId { get; set; }

        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public long ZipCode { get; set; }
        public long Address { get; set; }

        public Country Country { get; set; }
        public State State { get; set; }
        public City City { get; set; }

        public UserInformation UserInformation { get; set; }
    }
}
