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
    public class DepartmentSetupController : GenericBaseController<DepartmentSetup>
    {
        private readonly IDepartmentSetupService _departmentSetupSservice;

        public DepartmentSetupController(IDepartmentSetupService departmentSetupSservice) : base(departmentSetupSservice)
        {
            _departmentSetupSservice = departmentSetupSservice;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _departmentSetupSservice.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _departmentSetupSservice.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{departmentSetupId}")]
        public async Task<IActionResult> GetContactDetailsAsync(long departmentSetupId)
        {
            var res = await _departmentSetupSservice.GetDepartmentSetupDetailAsync(departmentSetupId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddDepartmentSetupDetailAsync ([FromForm] DepartmentSetupModel model)
        {
            var res = await _departmentSetupSservice.AddDepartmentSetupDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{departmentSetupId}")]
        public async Task<IActionResult> UpdateDepartmentSetupDetailAsync(long departmentSetupId, [FromForm] DepartmentSetupModel model)
        {
            var res = await _departmentSetupSservice.UpdateDepartmentSetupDetailAsync(departmentSetupId, model);
            return new ApiOkActionResult(res);
        }
    }
}
