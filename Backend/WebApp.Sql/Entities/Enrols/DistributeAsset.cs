using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class DistributeAsset : BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? AssetId { get; set; }
        public DateTime StartdDate { get; set; }
        public DateTime Enddate { get; set; }
        public string Remarks { get; set; }
        public User User { get; set; }
        public Employees Employees { get; set; }
        public Asset Assets { get; set; }
    }
}
