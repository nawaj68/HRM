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
    public class AwardTypeController : GenericBaseController<AwardType>
    {
        private readonly IAwardTypeService _awardtypeService;

        public AwardTypeController(IAwardTypeService awardtypeService) : base(awardtypeService)
        {
            _awardtypeService = awardtypeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync( string searchText = null)
        {
            var res = await _awardtypeService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _awardtypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _awardtypeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{awardtypeId}")]
        public async Task<IActionResult> GetAwardTypeDetailAsync(long awardtypeId)
        {
            var res = await _awardtypeService.GetAwardTypeDetailAsync(awardtypeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddAwardTypeDetailAsync([FromForm] AwardTypeModel model)
        {
            var res = await _awardtypeService.AddAwardTypeDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{awardtypeId}")]
        public async Task<IActionResult> UpdateAwardTypeDetailAsync(long awardtypeId, [FromForm] AwardTypeModel awardtype)
        {

            var res = await _awardtypeService.UpdateAwardTypeDetailAsync(awardtypeId, awardtype);

            return new ApiOkActionResult(res);
        }
    }
}
