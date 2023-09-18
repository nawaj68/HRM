using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models.Enrols;
using WebApp.Sql.Entities.Enrols;
//using WebApp.Sql.Migrations;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarningController : GenericBaseController<Warning>
    {
        private readonly IWarningService _warningService;
        public WarningController(IWarningService warningService) : base(warningService)
        {
            this._warningService = warningService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _warningService.GetSearchAsync(pageIndex, pageSize, searchText);
            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var res = await _warningService.GetFilterAsync(pageIndex, pageSize, filterText1);
            return new ApiOkActionResult(res);
        }
        [HttpGet("{warningId}")]
        public async Task<IActionResult> GetWarningDetailAsync(long warningId)
        {
            var res = await _warningService.GetWarningDetailAsync(warningId);
            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddWarningDetailAsync([FromForm] WarningModel model)
        {
            var res = await _warningService.AddWarningDetailAsync(model);
            return new ApiOkActionResult(res);
        }
        [HttpPut("{warningId}")]
        public async Task<IActionResult> UpdateWarningDetailAsync(long warningId, [FromForm] WarningModel warning)
        {
            var res = await _warningService.UpdateWarningDetailAsync(warningId, warning);
            return new ApiOkActionResult(res);
        }
    }
}
