using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Configurations
{
   public class OpeningYearModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public int OpeningYearNumber { get; set; }
        public DateTime OpeningDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime ClosingYear { get; set; }
    }
}
