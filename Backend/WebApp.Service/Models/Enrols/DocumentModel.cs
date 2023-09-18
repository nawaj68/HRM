using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static WebApp.Sql.Entities.Identities.IdentityModel;
using WebApp.Sql.Entities.Enrols;
using Microsoft.AspNetCore.Http;
using WebApp.Sql.Entities.Configurations;
using WebApp.Service.Models.Configurations;

namespace WebApp.Service.Models.Enrols
{
    public class DocumentModel:MasterModel
    {
        public DocumentModel()
        {

        }
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? DocumentTypeId { get; set; }
        public string Avatar { get; set; }
        public IFormFile AvatarFile { get; set; }
        public string Remark { get; set; }
        public UserModel User { get; set; }
        public EmployeesModel Employees { get; set; }
        public DocumentTypeModel DocumentType { get; set; }
    }
}
