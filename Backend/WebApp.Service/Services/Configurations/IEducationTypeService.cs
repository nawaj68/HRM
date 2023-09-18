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
    public interface IEducationTypeService : IBaseService<EducationType>
    {
        Task<Dropdown<EducationTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<EducationTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EducationTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<EducationTypeModel> GetEducationTypeDetailAsync(long educationtypeId);
        Task<EducationTypeModel> AddEducationTypeDetailAsync(EducationTypeModel model);
        Task<EducationTypeModel> UpdateEducationTypeDetailAsync(long educationtypeId, EducationTypeModel model);
        Task<EducationTypeModel> UpdateEducationTypeDetailAsync(long educationtypeId, string model);
    }
}
