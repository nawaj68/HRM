using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services
{
    public interface IEmployeesService : IBaseService<Employees>
    {
        Task<Dropdown<EmployeesModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<EmployeesModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EmployeesModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<EmployeesModel> GetEmployeesDetailAsync(long employeesId);
        Task<EmployeesModel> AddEmployeesDetailAsync(EmployeesModel model);
        Task<EmployeesModel> UpdateEmployeesDetailAsync(long employeesId, EmployeesModel model);
        Task<EmployeesModel> UpdateEmployeesDetailAsync(long employeesId, string model, List<IFormFile> images);
    }
}
