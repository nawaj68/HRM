using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class BranchInfoController : GenericBaseController<BranchInfo>
    {
        private readonly IBranchInfoService _branchInfoService;
        public BranchInfoController(IBranchInfoService branchInfoService) : base(branchInfoService)
        {
            _branchInfoService = branchInfoService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _branchInfoService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _branchInfoService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _branchInfoService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{branchInfoId}")]
        public async Task<IActionResult> GetBranchInfoDetailAsync(long branchInfoId)
        {
            var res = await _branchInfoService.GetBranchInfoDetailAsync(branchInfoId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddBranchInfoDetailAsync([FromForm] BranchInfoModel model)
        {
            var res = await _branchInfoService.AddBranchInfoDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{branchInfoId}")]
        public async Task<IActionResult> UpdateCompanyInfoDetailAsync(long branchInfoId, [FromForm] BranchInfoModel branchInfo)
        {

            var res = await _branchInfoService.UpdateBranchInfoDetailAsync(branchInfoId, branchInfo);

            return new ApiOkActionResult(res);
        }
    }
}
