using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class BankInfoModel:MasterModel
    {
        public BankInfoModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? BranchId { get; set; }
        public string AccountNumber { get; set; }
        public string RoutingNumber { get; set; }
        public string AccountName { get; set; }
        public string Remark { get; set; }
        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
        public BranchInfoModel BranchInfo { get; set; }
    }
}
