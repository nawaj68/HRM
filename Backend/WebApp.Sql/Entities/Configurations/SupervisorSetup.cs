using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class SupervisorSetup : BaseEntity
    {
        public long? CompanyId { get; set; }
        public long? EmployeeId { get; set; }
        public DateTime EffectedDate { get; set; }
        public CompanyInfo Company { get; set; }
        public Employees Employees { get; set; }

        public IList<Supervisor> Supervisors { get; set; }
    }
}
