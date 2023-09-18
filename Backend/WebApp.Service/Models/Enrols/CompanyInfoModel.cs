using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Service.Models.Enrols
{
    public class CompanyInfoModel : MasterModel
    {
        public CompanyInfoModel()
        {

        }
        public long? UserId { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public long? CountryId { get; set; }
        public long? StateId { get; set; }
        public long? CityId { get; set; }
        public string ZipCode { get; set; }
        public string ContactNumber { get; set; }
        public UserModel User { get; set; } 
        public BranchInfoModel Branch { get; set; }
    }
}
