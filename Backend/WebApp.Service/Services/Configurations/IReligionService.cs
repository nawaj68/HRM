using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IReligionService:IBaseService<Religion>
    {
        Task<Dropdown<ReligionModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<ReligionModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<ReligionModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<ReligionModel> AddReligionDetailsAsync(ReligionModel model);
        Task<ReligionModel> UpdateReligionDetailsAsync(long religionId, ReligionModel model);
        Task<ReligionModel> UpdateReligionDetailsAsync(long religionId, string model);
        Task<ReligionModel> GetReligionDetailsAsync(long religionId);
    }
}
