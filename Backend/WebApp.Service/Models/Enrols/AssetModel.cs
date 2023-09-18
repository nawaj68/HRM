using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Enrols
{
   public class AssetModel  : MasterModel
    {
        public AssetModel()
        { }
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
        public UserModel User { get; set; }
        public CompanyInfoModel CompanyInfo { get; set; }
        public AssetTypeModel AssetType { get; set; }
    }
}
