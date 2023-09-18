using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface ICountryService : IBaseService<Country>
    {
        Task<Dropdown<CountryModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<CountryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<CountryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<CountryModel> AddCountryDetailsAsync(CountryModel model);
        Task<CountryModel> UpdateCountryDetailsAsync(long countryId, CountryModel model);
        Task<CountryModel> UpdateCountryDetailsAsync(long countryId, string model);
        Task<CountryModel> GetCountryDetailsAsync(long countryId);
    }
}
