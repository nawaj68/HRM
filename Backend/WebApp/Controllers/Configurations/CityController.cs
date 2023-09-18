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
    public class CityController : GenericBaseController<City>
    {
        private readonly ICityService _cityService;

        public CityController(ICityService cityService) : base(cityService)
        {
            _cityService = cityService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(long? stateId = null, string searchText = null)
        {
            var res = await _cityService.GetDropdownAsync(stateId, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _cityService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{cityId}")]
        public async Task<IActionResult> GetCityDetailsAsync(long cityId)
        {
            var res = await _cityService.GetCityDetailsAsync(cityId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddCityDetailsAsync([FromForm] CityModel model)
        {
            var res = await _cityService.AddCityDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{cityId}")]
        public async Task<IActionResult> UpdateCityDetailsAsync(long cityId, [FromForm] CityModel model)
        {
            var res = await _cityService.UpdateCityDetailsAsync(cityId, model);

            return new ApiOkActionResult(res);
        }
    }
}
