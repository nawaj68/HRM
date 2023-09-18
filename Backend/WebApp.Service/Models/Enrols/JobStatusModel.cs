using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Configurations;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class JobStatusModel:MasterModel
    {
        public long EmployeeId { get; set; }
        public long StatusId { get; set; }
        public DateTime EffectedDate { get; set; }
        public string Remark { get; set; }

        public EmployeesModel Employees { get; set; }
        public StatusModel Status { get; set; }
    }
}
