using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Configurations
{
    public class NewApprovalWorkflowModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public string NewApprovalWorkflowName { get; set; }
        public string Remarks { get; set; }
    }
}
