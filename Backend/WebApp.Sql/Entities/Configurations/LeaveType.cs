using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class LeaveType : BaseEntity
    {
        public long? CompanyId { get; set; }
        public string LeaveTypeName { get; set; }
        public float FullPayment { get; set; }
        public float HalfPayment { get; set; }
        public bool IsMeternal { get; set; }
        public bool IsUnpaid { get; set; }
        public bool IsPartialLeave { get; set; }
        public CompanyInfo Company { get; set; }
    }
}
