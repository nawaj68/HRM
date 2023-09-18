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
    public class OpeningYearController : GenericBaseController<OpeningYear>
    {
        private readonly IOpeningYearService _openingService;

        public OpeningYearController(IOpeningYearService openingService) : base(openingService)
        {
            _openingService = openingService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _openingService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _openingService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{openingYearId}")]
        public async Task<IActionResult> GetOpeningYearDetailAsync(long openingYearId)
        {
            var res = await _openingService.GetOpeningYearDetailAsync(openingYearId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddOpeningYearDetailAsync([FromForm] OpeningYearModel model)
        {
            var res = await _openingService.AddOpeningYearDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{openingYearId}")]
        public async Task<IActionResult> UpdateOpeningYearDetailAsync(long openingYearId, [FromForm] OpeningYearModel openingYear)
        {

            var res = await _openingService.UpdateOpeningYearDetailAsync(openingYearId, openingYear);

            return new ApiOkActionResult(res);
        }
    }
}
