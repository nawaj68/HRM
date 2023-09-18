using WebApp.Service.Models;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.Entities.Enrols
{
    public class UserAddressInformationModel : MasterModel
    {
        public long UserInformationId { get; set; }

        public long CountryId { get; set; }
        public long StateId { get; set; }
        public long CityId { get; set; }
        public long ZipCode { get; set; }
        public long Address { get; set; }

        public CountryModel Country { get; set; }
        public StateModel State { get; set; }
        public CityModel City { get; set; }

        public UserInformationModel UserInformation { get; set; }
    }
}
