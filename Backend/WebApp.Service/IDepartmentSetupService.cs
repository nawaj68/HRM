using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IDepartmentSetupService:IBaseService<DepartmentSetup>
    {
        Task<Dropdown<DepartmentSetupModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<DepartmentSetupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DepartmentSetupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<DepartmentSetupModel> GetDepartmentSetupDetailAsync(long departmentSetupId);
        Task<DepartmentSetupModel> AddDepartmentSetupDetailAsync(DepartmentSetupModel model);
        Task<DepartmentSetupModel> UpdateDepartmentSetupDetailAsync(long departmentSetupId, DepartmentSetupModel model);
        Task<DepartmentSetupModel> UpdateDepartmentSetupDetailAsync(long departmentSetupId, string model);
    }
}
