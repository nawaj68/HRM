using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class Proficiency:BaseEntity
    {
        public string ProficiencyName { get; set; }

        public IList<Language> Languages { get; set; }
    }
}
