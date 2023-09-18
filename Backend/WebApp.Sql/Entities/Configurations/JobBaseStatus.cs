using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class JobBaseStatus : BaseEntity
    {
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public long? ProjectId { get; set; }
        public string JobBaseStatusCode { get; set; }
        public string JobBaseStatusTitle { get; set; }
        public CompanyInfo CompanyInfo { get; set; }
        public BranchInfo BranchInfo { get; set; }
        public Project Project { get; set; }

    }
}
