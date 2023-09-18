using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Enrols;

namespace WebApp.Service.Models.Configurations
{
    public class ClaimTypeModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public string CliamTypeName { get; set; }
        public CompanyInfoModel Company { get; set; }
    }
}
