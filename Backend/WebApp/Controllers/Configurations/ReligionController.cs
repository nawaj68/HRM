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
    public class ReligionController : GenericBaseController<Religion>
    {
        private readonly IReligionService _religionService;

        public ReligionController(IReligionService religionService) : base(religionService)
        {
            this._religionService = religionService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _religionService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _religionService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{religionId}")]
        public async Task<IActionResult> GetReligionDetailsAsync(long religionId)
        {
            var res = await _religionService.GetReligionDetailsAsync(religionId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddReligionDetailsAsync([FromForm] ReligionModel model)
        {
            var res = await _religionService.AddReligionDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{religionId}")]
        public async Task<IActionResult> UpdateReligionDetailsAsync(long religionId, [FromForm] ReligionModel model)
        {
            var res = await _religionService.UpdateReligionDetailsAsync(religionId, model);

            return new ApiOkActionResult(res);
        }

    }
}
