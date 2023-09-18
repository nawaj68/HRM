using System.Collections.Generic;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Sql.Entities.Configurations
{
    public class State : BaseEntity
    {
        public long CountryId { get; set; }
        public string Name { get; set; }

        public Country Country { get; set; }

        public IList<City> Citites { get; set; }
        public IList<UserInformation> UserInformations { get; set; }
        public IList<Contact> Contacts { get; set; }
        public IList<BranchInfo> BranchInfos { get; set; }
        public IList<CompanyInfo> CompanyInfos { get; set; }
    }
}
