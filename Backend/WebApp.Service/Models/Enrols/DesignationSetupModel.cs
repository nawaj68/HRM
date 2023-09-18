using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class DesignationSetupModel:MasterModel
    {
        public DesignationSetupModel() { }

        public long? EmployeeId { get; set; }
        public long? DesignationId { get; set; }
        public DateTime EffectedDate { get; set; }
        public string Remark { get; set; }

        public Employees Employees { get; set; }
        public Designation Designation { get; set; }
    }
}
