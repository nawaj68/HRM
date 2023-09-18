using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Configurations
{
    public class AwardTypeModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public string AwardTypeName { get; set; }
        public bool Status { get; set; }
    }
}
