using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class AwardInfo:BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? AwardTypeId { get; set; }
        public string AwardName { get; set; }
        public string Gift { get; set; }
        public double PriceAmount { get; set; }
        public string Avatar { get; set; }
        public string Remark { get; set; }
        public User User { get; set; }
        public Employees Employees { get; set; }
        public AwardType AwardType { get; set; }
    }
}
