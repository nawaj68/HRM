using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Service.Models.Enrols
{
    public class PassportModel : MasterModel
    {
        public PassportModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public string PassportNumber { get; set; }
        public long? CountryId { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime ExpireDate { get; set; }
        public string Remark { get; set; }
        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
        public CountryModel Country { get; set; }
    }
}
