using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;
using WebApp.Service.Models.Configurations;

namespace WebApp.Service.Models.Enrols
{
    public class DepartmentSetupModel:MasterModel
    {
        public DepartmentSetupModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? DepartmentId { get; set; }
        public string EffectedDate { get; set; }
        public string Remark { get; set; }

        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
        public DepartmentModel Department { get; set; }
    }
}
