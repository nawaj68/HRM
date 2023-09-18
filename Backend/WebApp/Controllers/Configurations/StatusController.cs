using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : GenericBaseController<Status>
    {
        private readonly IStatusService _statusService;

        public StatusController(IStatusService statusService) : base(statusService)
        {
            this._statusService = statusService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null) 
        {
            var res = await _statusService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
            
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _statusService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{statusId}")]
        public async Task<IActionResult> GetStatusDetailsAsync(long statusId)
        {
            var res = await _statusService.GetStatusDetailsAsync(statusId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddStatusDetailsAsync([FromForm] StatusModel model)
        {
            var res = await _statusService.AddStatusDetailsAsync(model);


            return new ApiOkActionResult(res);
        }

        [HttpPut("{statusId}")]
        public async Task<IActionResult> UpdateStatusDetailsAsync(long statusId, [FromForm] StatusModel model)
        {
            var res = await _statusService.UpdateStatusDetailsAsync(statusId, model);

            return new ApiOkActionResult(res);
        }
    }
}
