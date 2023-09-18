using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Configurations
{
    public class WorkflowMappingModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public long? EmployeeId { get; set; }
        public long? WorkflowId { get; set; }
        public long? DepartmentId { get; set; }
        public long? ApplicatonTypeId { get; set; }
    }
}
