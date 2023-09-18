using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IStateService : IBaseService<State>
    {
        Task<Dropdown<StateModel>> GetDropdownAsync(long? countryId = null, string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<StateModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<StateModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<StateModel> AddCountryDetailsAsync(StateModel model);
        Task<StateModel> UpdateCountryDetailsAsync(long stateId, StateModel model);
        Task<StateModel> UpdateCountryDetailsAsync(long stateId, string model);
        Task<StateModel> GetCountryDetailsAsync(long stateId);
    }
}


