using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class DepartmentSetup:BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? DepartmentId { get; set; }
        public string EffectedDate { get; set; }
        public string Remark { get; set; }

        public User User { get; set; }
        public Employees Employees { get; set; }
        public Department Department { get; set; }
    }
}
