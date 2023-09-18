using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeManagementCategoryController : GenericBaseController<EmployeeManagementCategory>
    {
        private readonly IEmployeeManagementCategoryService _employeeManagementCategoryService;
        public EmployeeManagementCategoryController(IEmployeeManagementCategoryService employeeManagementCategoryService) : base(employeeManagementCategoryService)
        {
            _employeeManagementCategoryService = employeeManagementCategoryService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _employeeManagementCategoryService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _employeeManagementCategoryService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{employeeMCId}")]
        public async Task<IActionResult> GetEmployeeManagementCategoryServiceDetailAsync(long employeeMCId)
        {
            var res = await _employeeManagementCategoryService.GetEmployeeManagementCategoryServiceDetailAsync(employeeMCId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddEmployeeManagementCategoryServiceDetailAsync([FromForm] EmployeeManagementCategoryModel model)
        {
            var res = await _employeeManagementCategoryService.AddEmployeeManagementCategoryServiceDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{employeeMCId}")]
        public async Task<IActionResult> UpdateEmployeeManagementCategoryServiceDetailAsync(long employeeMCId, [FromForm] EmployeeManagementCategoryModel model)
        {

            var res = await _employeeManagementCategoryService.UpdateEmployeeManagementCategoryServiceDetailAsync(employeeMCId, model);

            return new ApiOkActionResult(res);
        }
    }
}
