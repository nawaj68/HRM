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
    public class ClaimTypeController : GenericBaseController<ClaimType>
    {
        private readonly IClaimTypeService _claimtypeService;

        public ClaimTypeController(IClaimTypeService claimtypeService) : base(claimtypeService)
        {
            _claimtypeService = claimtypeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _claimtypeService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _claimtypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{claimTypeId}")]
        public async Task<IActionResult> GetClaimTypeDetailsAsync(long claimTypeId)
        {
            var res = await _claimtypeService.GetClaimTypeDetailsAsync(claimTypeId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddCountryDetailsAsync([FromForm] ClaimTypeModel model)
        {
            var res = await _claimtypeService.AddClaimTypeDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{claimTypeId}")]
        public async Task<IActionResult> UpdateClaimTypeDetailsAsync(long claimTypeId, [FromForm] ClaimTypeModel model)
        {
            var res = await _claimtypeService.UpdateClaimTypeDetailsAsync(claimTypeId, model);

            return new ApiOkActionResult(res);
        }
    }
}
