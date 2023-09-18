using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class Status:BaseEntity
    {
        public string StatusName { get; set; }

       public IList<JobStatus> JobStatus { get; set; }
    }
}
