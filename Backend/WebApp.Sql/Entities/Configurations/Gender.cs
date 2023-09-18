using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class Gender:BaseEntity
    {
        public string GenderName { get; set; }
        public IList<UserInformation> UserInformation { get; set; }
        public IList<Employees> Employees { get; set; }

    }
}
