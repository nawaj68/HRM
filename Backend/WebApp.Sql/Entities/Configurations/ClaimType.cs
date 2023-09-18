using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class ClaimType : BaseEntity
    {
        public long? CompanyId { get; set; }
        public string CliamTypeName { get; set; }
        public CompanyInfo Company { get; set; }
    }
}
