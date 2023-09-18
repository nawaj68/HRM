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
    public class WarningTypeController : GenericBaseController<WarningType>
    {
        private readonly IWarningTypeService _warningtypeeService;

        public WarningTypeController(IWarningTypeService warningtypeeService) : base(warningtypeeService)
        {
            _warningtypeeService = warningtypeeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync( string searchText = null)
        {
            var res = await _warningtypeeService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _warningtypeeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _warningtypeeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{warningtypeId}")]
        public async Task<IActionResult> GetWarningTypeDetailAsync(long warningtypeId)
        {
            var res = await _warningtypeeService.GetWarningTypeDetailAsync(warningtypeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddWarningTypeDetailAsync([FromForm] WarningTypeModel model)
        {
            var res = await _warningtypeeService.AddWarningTypeDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{warningtypeId}")]
        public async Task<IActionResult> UpdateWarningTypeDetailAsync(long warningtypeId, [FromForm] WarningTypeModel warningtype)
        {

            var res = await _warningtypeeService.UpdateWarningTypeDetailAsync(warningtypeId, warningtype);

            return new ApiOkActionResult(res);
        }
    }
}
