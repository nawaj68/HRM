using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
namespace WebApp.Service.Services.Configurations
{
    public interface IBloodGroupService : IBaseService<BloodGroup>
    {
        Task<Dropdown<BloodGroupModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<BloodGroupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<BloodGroupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<BloodGroupModel> AddBloodGroupDetailsAsync(BloodGroupModel model);
        Task<BloodGroupModel> UpdateBloodGroupDetailsAsync(long bloodgroupId, BloodGroupModel model);
        Task<BloodGroupModel> UpdateBloodGroupDetailsAsync(long bloodgroupId, string model);
        Task<BloodGroupModel> GetBloodGroupDetailsAsync(long bloodgroupId);
    }
}
