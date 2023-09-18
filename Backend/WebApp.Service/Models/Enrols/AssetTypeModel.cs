using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class AssetTypeModel :MasterModel
    {
        public AssetTypeModel()
        {

        }
        public long? UserId { get; set; }
        public string AssetName { get; set; }
        public string Avatar { get; set; }
        public IFormFile AvatarFile { get; set; }
        public long? CompanyId { get; set; }
        public long? BranchId { get; set; }
        public UserModel User { get; set; }

        //public IEnumerable<AssetModel> Assets { get; set; }
    }
}
