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
    public interface IEmployeeManagementCategoryService:IBaseService<EmployeeManagementCategory>
    {
        Task<Paging<EmployeeManagementCategoryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EmployeeManagementCategoryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<Paging<EmployeeManagementCategoryModel>> GetEmployeeManagementCategoryServiceSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EmployeeManagementCategoryModel>> GetEmployeeManagementCategoryServiceFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);



        Task<EmployeeManagementCategoryModel> GetEmployeeManagementCategoryServiceDetailAsync(long employeeMCId);
        Task<EmployeeManagementCategoryModel> AddEmployeeManagementCategoryServiceDetailAsync(EmployeeManagementCategoryModel model);
        Task<EmployeeManagementCategoryModel> UpdateEmployeeManagementCategoryServiceDetailAsync(long employeeMCId, EmployeeManagementCategoryModel model);



        //Task<EmployeesModel> UpdateEmployeesDetailAsync(long employeesId, string model, List<IFormFile> images);
    }
}
