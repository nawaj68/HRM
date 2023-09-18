using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Enrols;
using WebApp.Service.Services;
using WebApp.Service.Services.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : GenericBaseController<Employees>
    {
        private readonly IEmployeesService _employeesService;
        public EmployeesController(IEmployeesService employeesService) : base(employeesService)
        {
            _employeesService = employeesService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _employeesService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _employeesService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _employeesService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{employeesId}")]
        public async Task<IActionResult> GetEmployeesDetailAsync(long employeesId)
        {
            var res = await _employeesService.GetEmployeesDetailAsync(employeesId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddEmployeesDetailAsync([FromForm] EmployeesModel model)
        {
            var res = await _employeesService.AddEmployeesDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{employeesId}")]
        public async Task<IActionResult> UpdateEmployeesDetailAsync(long employeesId, [FromForm] EmployeesModel employees)
        {

            var res = await _employeesService.UpdateEmployeesDetailAsync(employeesId, employees);

            return new ApiOkActionResult(res);
        }
    }
}
