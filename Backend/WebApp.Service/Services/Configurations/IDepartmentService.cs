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
    public interface IDepartmentService : IBaseService<Department>
    {
        Task<Dropdown<DepartmentModel>> GetDropdownAsync(long? departmentId = null, string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<DepartmentModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DepartmentModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<DepartmentModel> AddDepartmentDetailsAsync(DepartmentModel model);
        Task<DepartmentModel> UpdateDepartmentDetailsAsync(long departmentId, DepartmentModel model);
        Task<DepartmentModel> UpdateDepartmentDetailsAsync(long departmentId, string model);
        Task<DepartmentModel> GetDepartmentDetailsAsync(long departmentId);
    }
}
