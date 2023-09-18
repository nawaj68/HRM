using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Services.Configurations;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : GenericBaseController<Department>
    {
        private readonly IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService) : base(departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(long? designationId = null, string searchText = null)
        {
            var res = await _departmentService.GetDropdownAsync(designationId, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _departmentService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{departmentId}")]
        public async Task<IActionResult> GetDepartmentDetailsAsync(long departmentId)
        {
            var res = await _departmentService.GetDepartmentDetailsAsync(departmentId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddDepartmentDetailsAsync([FromForm] DepartmentModel model)
        {
            var res = await _departmentService.AddDepartmentDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{departmentId}")]
        public async Task<IActionResult> UpdateDepartmentDetailsAsync(long departmentId, [FromForm] DepartmentModel model)
        {
            var res = await _departmentService.UpdateDepartmentDetailsAsync(departmentId, model);

            return new ApiOkActionResult(res);
        }
    }
}
