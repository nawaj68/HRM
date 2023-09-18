using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class BranchInfo : BaseEntity
    {
        public long?  UserId { get; set; }
        public long? CompanyId { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public long? CountryId { get; set; }
        public long? CityId { get; set; }
        public long? StateId { get; set; }
        public string ZipCode { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public User User { get; set; }
        public State State { get; set; }
        public Country Country { get; set; }
        public City City { get; set; }
        public IList<AssetType> AssetTypes { get; set; }
        public IList<Project> Projects { get; set; }
        public IList<NewJobStatus> NewJobStatuses { get; set; }
        public IList<JobBaseStatus> JobBaseStatuses { get; set; }
        public IList<WorkflowMaping> WorkflowMapings { get; set; }
        public IList<BankInfo> BankInfos { get; set; }
    }

}
