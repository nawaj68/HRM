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
    public interface IEmploymentCategoryService : IBaseService<EmploymentCategorie>
    {
        Task<Dropdown<EmploymentCategoryModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<EmploymentCategoryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EmploymentCategoryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<EmploymentCategoryModel> GetEmploymentCategorieDetailAsync(long employmentcategorieId);
        Task<EmploymentCategoryModel> AddEmploymentCategorieDetailAsync(EmploymentCategoryModel model);
        Task<EmploymentCategoryModel> UpdateEmploymentCategorieDetailAsync(long employmentcategorieId, EmploymentCategoryModel model);
        Task<EmploymentCategoryModel> UpdateEmploymentCategorieDetailAsync(long employmentcategorieId, string model);
    }
}
