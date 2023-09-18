using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Enrols;

namespace WebApp.Service.Models.Configurations
{
    public class JobBaseStatusModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public long? ProjectId { get; set; }
        public string JobBaseStatusCode { get; set; }
        public string JobBaseStatusTitle { get; set; }
        public CompanyInfoModel CompanyInfo { get; set; }
        public BranchInfoModel BranchInfo { get; set; }
        public ProjectModel Project { get; set; }
 
    }
}
