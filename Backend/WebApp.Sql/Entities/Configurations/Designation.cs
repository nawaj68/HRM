using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class Designation : BaseEntity
    {
        public string Name { get; set; }
        
        public IList<Department> Departments { get; set; }
        public IList<Employees > Employees { get; set; }
        public IList<DesignationSetup> DesignationSetups { get; set; }
        
    }
}
