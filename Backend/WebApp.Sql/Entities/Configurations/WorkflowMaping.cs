using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class WorkflowMaping : BaseEntity
    {
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public long? EmployeeId { get; set; }
        public long? WorkflowId { get; set; }
        public long? DepartmentId { get; set; }
        public long? ApplicatonTypeId { get; set; }
        public CompanyInfo Company { get; set; }
        public BranchInfo Branch { get; set; }
        public Employees Employees { get; set; }
        public NewApprovalWorkflow Workflow { get; set; }
        public Department Department { get; set; }
    }
}
