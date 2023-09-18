using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class AssetType : BaseEntity
    {
        public long? UserId { get; set; }
        public string AssetName { get; set; }
        public string Avatar { get; set; }
        public long?  CompanyId { get; set; }
        public long? BranchId { get; set; }
        public User User { get; set; }
        public CompanyInfo Company { get; set; }
        public BranchInfo Branch { get; set; }
        public IList<Asset> Assets { get; set; }

    }
}
