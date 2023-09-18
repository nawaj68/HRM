using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface ICityService : IBaseService<City>
    {
        Task<Dropdown<CityModel>> GetDropdownAsync(long? stateId = null, string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<CityModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<CityModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<CityModel> AddCityDetailsAsync(CityModel model);
        Task<CityModel> UpdateCityDetailsAsync(long cityId, CityModel model);
        Task<CityModel> UpdateCityDetailsAsync(long cityId, string model);
        Task<CityModel> GetCityDetailsAsync(long cityId);
    }
}