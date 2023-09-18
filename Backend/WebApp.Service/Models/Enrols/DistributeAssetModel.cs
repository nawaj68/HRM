using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Service.Models.Enrols
{
    public class DistributeAssetModel:MasterModel
    {
        public DistributeAssetModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? AssetId { get; set; }
        public DateTime StartdDate { get; set; }
        public DateTime Enddate { get; set; }
        public string Remarks { get; set; }
        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
        public AssetModel Assets { get; set; }
    }
}
