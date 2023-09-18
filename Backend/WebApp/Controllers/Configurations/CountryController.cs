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
    [ApiController]
    [Route("api/[controller]")]
    public class CountryController : GenericBaseController<Country>
    {
        private readonly ICountryService _countryService;

        public CountryController(ICountryService countryService) : base(countryService)
        {
            _countryService = countryService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _countryService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _countryService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{countryId}")]
        public async Task<IActionResult> GetCountryDetailsAsync(long countryId)
        {
            var res = await _countryService.GetCountryDetailsAsync(countryId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddCountryDetailsAsync([FromForm] CountryModel model)
        {
            var res = await _countryService.AddCountryDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{countryId}")]
        public async Task<IActionResult> UpdateCountryDetailsAsync(long countryId, [FromForm] CountryModel model)
        {
            var res = await _countryService.UpdateCountryDetailsAsync(countryId, model);

            return new ApiOkActionResult(res);
        }
    }
}
