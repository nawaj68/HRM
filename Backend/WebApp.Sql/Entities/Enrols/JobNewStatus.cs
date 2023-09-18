using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class JobNewStatus : BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public bool StatusType { get; set; }
        public string NextJobStatusType { get; set; }
        public DateTime EffectedDate { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Remarks { get; set; }
        public User User { get; set; }
        public Employees Employees { get; set; }
    }
}
