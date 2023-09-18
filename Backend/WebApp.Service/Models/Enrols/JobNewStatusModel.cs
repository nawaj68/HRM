using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Service.Models.Enrols
{
    public class JobNewStatusModel: MasterModel 
    {
        public JobNewStatusModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public bool StatusType { get; set; }
        public string NextJobStatusType { get; set; }
        public DateTime EffectedDate { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Remarks { get; set; }
        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
    }
}
