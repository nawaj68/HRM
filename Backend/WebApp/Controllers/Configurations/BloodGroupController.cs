using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class BloodGroupController : GenericBaseController<BloodGroup>
    {
        private readonly IBloodGroupService _bloodGroupService;

        public BloodGroupController(IBloodGroupService bloodGroupService) : base(bloodGroupService)
        {
            _bloodGroupService = bloodGroupService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _bloodGroupService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _bloodGroupService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{bloodgroupId}")]
        public async Task<IActionResult> GetContactDetailsAsync(long bloodgroupId)
        {
            var res = await _bloodGroupService.GetBloodGroupDetailsAsync(bloodgroupId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddBloodGroupDetailsAsync([FromForm] BloodGroupModel model)
        {
            var res = await _bloodGroupService.AddBloodGroupDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{bloodgroupId}")]
        public async Task<IActionResult> UpdateContactDetailsAsync(long bloodgroupId, [FromForm] BloodGroupModel model)
        {

            var res = await _bloodGroupService.UpdateBloodGroupDetailsAsync(bloodgroupId, model);

            return new ApiOkActionResult(res);
        }


    }
}
