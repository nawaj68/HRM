using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Enrols
{
    public class BranchInfoModel : MasterModel
    {
        public BranchInfoModel()
        {

        }
        public long? UserId { get; set; }
        public long? CompanyId { get; set; }
        public string BranchName { get; set; }
        public string BranchAddress { get; set; }
        public long? CountryId { get; set; }
        public long? CityId { get; set; }
        public long? StateId { get; set; }
        public string ZipCode { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public UserModel User { get; set; }
        //public IEnumerable<AssetTypeModel> AssetTypes { get; set; }
        //public IEnumerable<ProjectModel> Projects { get; set; }
        //public IEnumerable<NewJobStatusModel> NewJobStatuses { get; set; }
        //public IEnumerable<JobBaseStatusModel> JobBaseStatuses { get; set; }
        //public IEnumerable<WorkflowMapingModel> WorkflowMapings { get; set; }
    }
}