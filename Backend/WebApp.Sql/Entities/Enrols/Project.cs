using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class Project : BaseEntity
    {
        public long? UserId { get; set; }
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public float Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public User User { get; set; }
        public CompanyInfo Company { get; set; }
        public BranchInfo Branch { get; set; }
        public IList<NewJobStatus> NewJobStatuses { get; set; }
        public IList<JobBaseStatus> JobBaseStatuses { get; set; }
    }
}
