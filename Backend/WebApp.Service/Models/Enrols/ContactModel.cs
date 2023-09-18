using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class ContactModel:MasterModel
    {
        public ContactModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public string OfficeMobileNo { get; set; }
        public string PersonalMobileNo { get; set; }
        public string OfficeEmail { get; set; }
        public string PersonalEmail { get; set; }
        public string PresentAddress { get; set; }
        public long? PresentCountryId { get; set; }
        public long? PresentStateId { get; set; }
        public long? PresentCityId { get; set; }
        public string PresentZipCode { get; set; }
        public string PermanentAddress { get; set; }
        public long? PermanentCountryId { get; set; }
        public long? PermanentStateId { get; set; }
        public long? PermanentCityId { get; set; }
        public string PermanentZipCode { get; set; }

        public EmployeesModel Employees { get; set; }
        public UserModel User { get; set; }
        public CountryModel Country { get; set; }
        public StateModel State { get; set; }
        public CityModel City { get; set; }
    }
}
