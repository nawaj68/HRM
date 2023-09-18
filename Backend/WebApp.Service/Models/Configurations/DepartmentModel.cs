using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Configurations
{
    public class DepartmentModel : MasterModel
    {
        public string Name { get; set; }
        public long DesignationId { get; set; }
    }
}
