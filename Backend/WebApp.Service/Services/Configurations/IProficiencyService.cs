using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IProficiencyService:IBaseService<Proficiency>
    {
        Task<Dropdown<ProficiencyModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<ProficiencyModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<ProficiencyModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<ProficiencyModel> AddProficiencyDetailsAsync(ProficiencyModel model);
        Task<ProficiencyModel> UpdateProficiencyDetailsAsync(ProficiencyModel model);
        Task<ProficiencyModel> UpdateProficiencyDetailsAsync(long proficiencyId, string model);
        Task<ProficiencyModel> GetProficiencyDetailsAsync(long proficiencyId);
    }
}
