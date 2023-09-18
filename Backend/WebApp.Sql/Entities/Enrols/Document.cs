using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
using static WebApp.Sql.Entities.Identities.IdentityModel;

namespace WebApp.Sql.Entities.Enrols
{
    public class Document: BaseEntity
    {
        public long? UserId { get; set; }
        public long? EmployeeId { get; set; }
        public long? DocumentTypeId { get; set; }
        public string Avatar { get; set; }
        public string Remark { get; set; }
        public User User { get; set; }
        public Employees Employees { get; set; }
        public DocumentType DocumentType { get; set; }
       
    }
}
