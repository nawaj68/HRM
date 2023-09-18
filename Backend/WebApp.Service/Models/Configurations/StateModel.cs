using WebApp.Service.Models;

namespace WebApp.Sql.Entities.Configurations
{
    public class StateModel : MasterModel
    {
        public string Name { get; set; }
        public long CountryId { get; set; }

        public CountryModel Country { get; set; }
    }
}
