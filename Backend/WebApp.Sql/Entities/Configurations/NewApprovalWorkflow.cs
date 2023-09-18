using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class NewApprovalWorkflow : BaseEntity
    {
        public long? CompanyId { get; set; }
        public string NewApprovalWorkflowName { get; set; }
        public string Remarks { get; set; }
        public CompanyInfo Company { get; set; }
        public IList<WorkflowMaping> WorkflowMapings { get; set; }
    }
}
