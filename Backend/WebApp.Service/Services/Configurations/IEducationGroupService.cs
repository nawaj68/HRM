using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IEducationGroupService : IBaseService<EducationGroup>
    {
        Task<Dropdown<EducationGroupModel>> GetDropdownAsync(long? companyId = null, string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<EducationGroupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EducationGroupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<EducationGroupModel> GetEducationgroupDetailAsync(long educationgroupId);
        Task<EducationGroupModel> AddEducationgroupDetailAsync(EducationGroupModel model);
        Task<EducationGroupModel> UpdateEducationgroupDetailAsync(long educationgroupId, EducationGroupModel model);
        Task<EducationGroupModel> UpdateEducationgroupDetailAsync(long educationgroupId, string model);
    }
}
