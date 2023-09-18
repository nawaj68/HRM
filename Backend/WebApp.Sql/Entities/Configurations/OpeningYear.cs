using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
   public class OpeningYear : BaseEntity
    {
        public long? CompanyId { get; set; }
        public int OpeningYearNumber { get; set; }
        public DateTime OpeningDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime ClosingYear { get; set; }
        public CompanyInfo Company { get; set; }
    }
}
