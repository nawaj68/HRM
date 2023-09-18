using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Enrols;

namespace WebApp.Service.Models.Configurations
{
    public class LeaveTypeModel : MasterModel
    {
        public long? CompanyId { get; set; }
        public string LeaveTypeName { get; set; }
        public float FullPayment { get; set; }
        public float HalfPayment { get; set; }
        public bool IsMeternal { get; set; }
        public bool IsUnpaid { get; set; }
        public bool IsPartialLeave { get; set; }
        public CompanyInfoModel Company { get; set; }
    }
}
