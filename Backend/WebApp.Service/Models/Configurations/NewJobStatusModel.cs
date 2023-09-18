using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Enrols;

namespace WebApp.Service.Models.Configurations
{
    public class NewJobStatusModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public long? ProjectId { get; set; }
        public string StatusCode { get; set; }
        public string StatusTitle { get; set; }
        public CompanyInfoModel CompanyInfo {get; set; }
        public BranchInfoModel BranchInfo { get; set; }
        public ProjectModel Project { get; set; }

    }
}
