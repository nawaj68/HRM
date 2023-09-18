using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Service.Models.Enrols
{
    public class WarningModel : MasterModel
    {
        public WarningModel()
            {
            }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? WarningByEmployeeId { get; set; }
        public DateTime WarningDate { get; set; }
        public string WarningType { get; set; }
        public string WarningDetails { get; set; }
        public string Remarks { get; set; }
        public string Action { get; set; }

        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
    }
}
