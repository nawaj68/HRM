using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
//using WebApp.Sql.Migrations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class DesignationSetup:BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? DesignationId { get; set; }
        public DateTime EffectedDate { get; set; }
        public string Remark { get; set; }

        public User User { get; set; }
        public Employees Employees { get; set; }
        public Designation Designation { get; set; }
    }
}
