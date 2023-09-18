using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class Asset : BaseEntity
    {
        public long? UserId { get; set; }
        public long? CompanyId { get; set; }
        public long? AssetTypeId { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public long? SupplierId { get; set; }
        public long? ManufacturerId { get; set; }
        public int SerialNumber { get; set; }
        public int ModelNumber { get; set; }
        public DateTime PurchaseDate { get; set; }
        public DateTime WarrantyPeriod { get; set; }
        public long? AssetStatusId { get; set; }
        public CompanyInfo CompanyInfo { get; set; }
        public AssetType AssetType { get; set; }
        public User User { get; set; }
        public IList<AssetRequisition> AssetRequisitions { get; set; }
        public IList<DistributeAsset> DistributeAssets { get; set; }

    }

}
