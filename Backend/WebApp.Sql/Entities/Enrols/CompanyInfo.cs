using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class CompanyInfo : BaseEntity
    {
        public long? UserId { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public long? CountryId { get; set; }
        public long? StateId { get; set; }
        public long? CityId { get; set; }
        public string ZipCode { get; set; }
        public string ContactNumber { get; set; }
        public User User { get; set; }
        public Country Country { get; set; }
        public State State { get; set; }
        public City City { get; set; }
        public IList<AssetType> AssetTypes { get; set; }
        public IList<Asset> Assets { get; set; }
        public IList<Project> Projects { get; set; }
        public IList<NewJobStatus> NewJobStatuses { get; set; }
        public IList<JobBaseStatus> JobBaseStatuses { get; set; }
        public IList<EducationGroup> EducationGroups { get; set; }
        public IList<EducationType> EducationTypes { get; set; }
        public IList<Grade> Grades { get; set; }
        public IList<Institute> Institutes { get; set; }
        public IList<EmploymentCategorie> EmploymentCategories { get; set; }
        public IList<DocumentCategorie> DocumentCategories { get; set; }
        public IList<AwardType> AwardTypes { get; set; }
        public IList<WarningType> WarningTypes { get; set; }
        public IList<SupervisorSetup> SupervisorSetups { get; set; }
        public IList<NewApprovalWorkflow> NewApprovalWorkflows { get; set; }
        public IList<ClaimType> ClaimTypes { get; set; }
        public IList<LeaveType> LeaveTypes { get; set; }
        public IList<OpeningYear> OpeningYears { get; set; }
        public IList<WorkflowMaping> WorkflowMapings { get; set; }
      
    }

}
