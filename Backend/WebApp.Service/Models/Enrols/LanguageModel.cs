using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Enrols
{
    public class LanguageModel: MasterModel
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? ProficencyId { get; set; }
        public string LanguageName { get; set; }
        public string Remark { get; set; }
    }
}
