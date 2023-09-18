using WebApp.Service.Models;

namespace WebApp.Sql.Entities.Configurations
{
    public class CityModel : MasterModel
    {
        public long StateId { get; set; }
        public string Name { get; set; }
    }
}
