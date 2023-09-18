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
    public class LeaveTypeController : GenericBaseController<LeaveType>
    {
        private readonly ILeaveTypeService _leavetypeService;

        public LeaveTypeController(ILeaveTypeService leavetypeService) : base(leavetypeService)
        {
            _leavetypeService = leavetypeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _leavetypeService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _leavetypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{leaveTypeId}")]
        public async Task<IActionResult> GetLeaveTypeDetailsAsync(long leaveTypeId)
        {
            var res = await _leavetypeService.GetLeaveTypeDetailsAsync(leaveTypeId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddLeaveTypeDetailsAsync([FromForm] LeaveTypeModel model)
        {
            var res = await _leavetypeService.AddLeaveTypeDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{leaveTypeId}")]
        public async Task<IActionResult> UpdateLeaveTypeDetailsAsync(long leaveTypeId, [FromForm] LeaveTypeModel model)
        {
            var res = await _leavetypeService.UpdateLeaveTypeDetailsAsync(leaveTypeId, model);

            return new ApiOkActionResult(res);
        }
    }
}
