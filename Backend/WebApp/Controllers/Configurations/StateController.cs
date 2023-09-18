using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Services.Configurations;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [ApiController]
    [Route("api/[controller]")]
    public class StateController : GenericBaseController<State>
    {
        private readonly IStateService _stateService;

        public StateController(IStateService stateService) : base(stateService)
        {
            _stateService = stateService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(long? countryId = null, string searchText = null)
        {
            var res = await _stateService.GetDropdownAsync(countryId, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _stateService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{stateId}")]
        public async Task<IActionResult> GetContactDetailsAsync(long stateId)
        {
            var res = await _stateService.GetCountryDetailsAsync(stateId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddBloodGroupDetailsAsync([FromForm] StateModel model)
        {
            var res = await _stateService.AddCountryDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{stateId}")]
        public async Task<IActionResult> UpdateContactDetailsAsync(long stateId, [FromForm] StateModel model)
        {
            var res = await _stateService.UpdateCountryDetailsAsync(stateId, model);

            return new ApiOkActionResult(res);
        }
    }
}
