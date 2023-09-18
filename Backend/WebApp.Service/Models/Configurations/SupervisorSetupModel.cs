using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Enrols;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Configurations
{
    public class SupervisorSetupModel : MasterModel
    {
        public SupervisorSetupModel()
        {

        }
        public long? CompanyId { get; set; }
        public long? EmployeeId { get; set; }
        public DateTime EffectedDate { get; set; }
        public CompanyInfoModel Company { get; set; }
        public EmployeesModel Employees { get; set; }
    }
}
