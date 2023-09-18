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
    public class AssetRequisitionController : GenericBaseController<AssetRequisition>
    {
        private readonly IAssetRequisitionService _assetRequisitionService;
        public AssetRequisitionController(IAssetRequisitionService assetRequisitionService) : base(assetRequisitionService)
        {
            this._assetRequisitionService = assetRequisitionService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _assetRequisitionService.GetSearchAsync(pageIndex, pageSize, searchText);
            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var res = await _assetRequisitionService.GetFilterAsync(pageIndex, pageSize, filterText1);
            return new ApiOkActionResult(res);
        }
        [HttpGet("{assetRequisitionId}")]
        public async Task<IActionResult> GetAssetRequisitionDetailAsync(long assetRequisitionId)
        {
            var res = await _assetRequisitionService.GetAssetRequisitionDetailAsync(assetRequisitionId);
            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddDistributeAssetDetailAsync([FromForm] AssetRequisitionModel model)
        {
            var res = await _assetRequisitionService.AddAssetRequisitionDetailAsync(model);
            return new ApiOkActionResult(res);
        }
        [HttpPut("{assetRequisitionId}")]
        public async Task<IActionResult> UpdateAssetRequisitionDetailAsync(long assetRequisitionId, [FromForm] AssetRequisitionModel assetRequisition)
        {
            var res = await _assetRequisitionService.UpdateAssetRequisitionDetailAsync(assetRequisitionId, assetRequisition);
            return new ApiOkActionResult(res);
        }
    }
}
