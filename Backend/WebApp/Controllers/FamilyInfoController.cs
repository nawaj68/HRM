using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FamilyInfoController : GenericBaseController<FamilyInfo>
    {
        private readonly IFamilyInfoService _familyInfoService;

        public FamilyInfoController(IFamilyInfoService familyInfoService) : base(familyInfoService)
        {
            this._familyInfoService = familyInfoService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _familyInfoService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _familyInfoService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{familyInfoId}")]
        public async Task<IActionResult> GetFamilyInfoDetailAsync(long familyInfoId)
        {
            var res = await _familyInfoService.GetFamilyInfoDetailAsync(familyInfoId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddFamilyInfoDetailAsync([FromForm] FamilyInfoModel model)
        {
            var res = await _familyInfoService.AddFamilyInfoDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{familyInfoId}")]
        public async Task<IActionResult> UpdateFamilyInfoDetailAsync(long familyInfoId, [FromForm] FamilyInfoModel employees)
        {

            var res = await _familyInfoService.UpdateFamilyInfoDetailAsync(familyInfoId, employees);

            return new ApiOkActionResult(res);
        }
    }
}
