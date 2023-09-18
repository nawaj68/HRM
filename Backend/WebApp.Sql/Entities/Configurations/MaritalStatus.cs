using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class MaritalStatus:BaseEntity
    {
        public string MaritalStatusName { get; set; }
        public IList<UserInformation> UserInformation { get; set; }
    }
}
