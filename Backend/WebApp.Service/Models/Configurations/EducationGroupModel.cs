using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Enrols;

namespace WebApp.Service.Models.Configurations
{
    public class EducationGroupModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public string EducationGroupName { get; set; }
        public bool Status { get; set; }
        public CompanyInfoModel CompanyInfo { get; set; }   

        
    }
}
