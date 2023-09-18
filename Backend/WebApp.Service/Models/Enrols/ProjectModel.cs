using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Enrols
{
    public class ProjectModel : MasterModel
    {
        public ProjectModel()
        {

        }
        public long? UserId { get; set; }
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public float Duration { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public UserModel User { get; set; }

        //public IEnumerable<NewJobStatusModel> NewJobStatuses { get; set; }
        //public IEnumerable<JobBaseStatusModel> JobBaseStatuses { get; set; }
    }
}
