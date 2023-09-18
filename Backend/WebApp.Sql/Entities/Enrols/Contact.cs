using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
//using WebApp.Sql.Migrations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class Contact:BaseEntity
    {
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

        public Employees Employees { get; set; }
        public User User { get; set; }
        public Country Country { get; set; }
        public State State { get; set; }
        public City City { get; set; }

    }
}
