using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class DocumentCategorie : BaseEntity
    {
        public long? CompanyId { get; set; }
        public string DocumentCategorieName { get; set; }
        public bool Status { get; set; }
        public CompanyInfo CompanyInfo { get; set; }
    }
}
