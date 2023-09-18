using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class AwardType : BaseEntity
    {
        public long? CompanyId { get; set; }
        public string AwardTypeName { get; set; }
        public bool Status { get; set; }
        public CompanyInfo Company { get; set; }

        public IList<AwardInfo> AwardInfos { get; set; }
    }
}
