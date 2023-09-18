using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Sql.Entities.Enrols
{
    public class JobStatus:BaseEntity
    {
        public long EmployeeId { get; set; }
        public long StatusId { get; set; }
        public DateTime EffectedDate { get; set; }
        public string Remark { get; set; }

        public Employees Employees { get; set; }
        public Status Status { get; set; }      
    }
}
