using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class Department : BaseEntity
    {
        public long DesignationId { get; set; }
        public string Name { get; set; }
        public Designation Designation { get; set; }    
        public IList<Employees> Employees { get; set; }
        public IList<DepartmentSetup> DepartmentSetups { get; set; }
        public IList<WorkflowMaping> WorkflowMapings { get; set; }

    }
}
