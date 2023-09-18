using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class BankInfo:BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? BranchId { get; set; }
        public string AccountNumber { get; set; }
        public string RoutingNumber { get; set; }
        public string AccountName { get; set; }
        public string Remark { get; set; }
        public User User { get; set; }
        public Employees Employees { get; set; }
        public BranchInfo BranchInfo { get; set; }
    }
}
