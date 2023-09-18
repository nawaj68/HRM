using WebApp.Service.Models;

namespace WebApp.Sql.Entities.Configurations
{
    public class CountryModel : MasterModel
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public string Currency { get; set; }
        public string Flag { get; set; }
    }
}
