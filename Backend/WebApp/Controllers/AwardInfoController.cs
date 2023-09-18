using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models.Enrols;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AwardInfoController : GenericBaseController<AwardInfo>
    {
        private readonly IAwardInfoService _awardInfoService;
        public AwardInfoController(IAwardInfoService awardInfoService):base(awardInfoService)
        {
            this._awardInfoService=awardInfoService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _awardInfoService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _awardInfoService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _awardInfoService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{awardinfoId}")]
        public async Task<IActionResult> GetAwardInfoDetailAsync(long awardinfoId)
        {
            var res = await _awardInfoService.GetAwardInfoDetailAsync(awardinfoId);

            return new ApiOkActionResult(res);
        }
        
        [HttpPost()]
        public async Task<IActionResult> AddAwardInfoDetailAsync([FromForm] AwardInfoModel model)
        {
            var res = await _awardInfoService.AddAwardInfoDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        
        [HttpPut("{awardinfoId}")]
        public async Task<IActionResult> UpdateAwardInfoDetailAsync(long awardinfoId, [FromForm] AwardInfoModel awardinfo)
        {

            var res = await _awardInfoService.UpdateAwardInfoDetailAsync(awardinfoId, awardinfo);

            return new ApiOkActionResult(res);
        }
        

    }
}
