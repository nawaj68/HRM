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
    public class MaritalStatusController : GenericBaseController<MaritalStatus>
    {
        private readonly IMaritalStatusService _maritalStatusService;

        public MaritalStatusController(IMaritalStatusService maritalStatusService) : base(maritalStatusService)
        {
            this._maritalStatusService = maritalStatusService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _maritalStatusService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _maritalStatusService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{maritalStatusId}")]
        public async Task<IActionResult> GetMeritalStatusDetailsAsync(long maritalStatusId)
        {
            var res = await _maritalStatusService.GetMaritalStatusDetailsAsync(maritalStatusId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddMeritalStatusDetailsAsync([FromForm] MaritalStatusModel model)
        {
            var res = await _maritalStatusService.AddMaritalStatusDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{maritalStatusId}")]
        public async Task<IActionResult> UpdateContactDetailsAsync(long maritalStatusId, [FromForm] MaritalStatusModel model)
        {
            var res = await _maritalStatusService.UpdateMaritalStatusDetailsAsync(maritalStatusId, model);

            return new ApiOkActionResult(res);
        }
    }
}
