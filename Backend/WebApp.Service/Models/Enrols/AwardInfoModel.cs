using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;
using WebApp.Sql.Entities.Enrols;
using Microsoft.AspNetCore.Http;
using WebApp.Service.Models.Configurations;

namespace WebApp.Service.Models.Enrols
{
    public class AwardInfoModel:MasterModel
    {
        public AwardInfoModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? AwardTypeId { get; set; }
        public string AwardName { get; set; }
        public string Gift { get; set; }
        public double PriceAmount { get; set; }
        public string Avatar { get; set; }
        public IFormFile AvatarFile { get; set; }
        public string Remark { get; set; }
        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
        public AwardTypeModel AwardType { get; set; }
    }
}
