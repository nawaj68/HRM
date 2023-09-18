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
    public class DistributeAssetController : GenericBaseController<DistributeAsset>
    {
        private readonly IDistributeAssetService _distributeAssetService;
        public DistributeAssetController(IDistributeAssetService distributeAssetService) : base(distributeAssetService)
        {
            this._distributeAssetService = distributeAssetService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _distributeAssetService.GetSearchAsync(pageIndex, pageSize, searchText);
            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var res = await _distributeAssetService.GetFilterAsync(pageIndex, pageSize, filterText1);
            return new ApiOkActionResult(res);
        }
        [HttpGet("{distributeAssetId}")]
        public async Task<IActionResult> GetDistributeAssetDetailAsync(long distributeAssetId)
        {
            var res = await _distributeAssetService.GetDistributeAssetDetailAsync(distributeAssetId);
            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddDistributeAssetDetailAsync([FromForm] DistributeAssetModel model)
        {
            var res = await _distributeAssetService.AddDistributeAssetDetailAsync(model);
            return new ApiOkActionResult(res);
        }
        [HttpPut("{distributeAssetId}")]
        public async Task<IActionResult> UpdateDistributeAssetDetailAsync(long distributeAssetId, [FromForm] DistributeAssetModel distributeAsset)
        {
            var res = await _distributeAssetService.UpdateDistributeAssetDetailAsync(distributeAssetId, distributeAsset);
            return new ApiOkActionResult(res);
        }
    }
}
