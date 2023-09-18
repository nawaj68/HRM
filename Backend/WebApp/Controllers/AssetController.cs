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
    public class AssetController : GenericBaseController<Asset>
    {
        private readonly IAssetService _assetService;
        public AssetController(IAssetService assetService) : base(assetService)
        {
            _assetService = assetService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _assetService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _assetService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _assetService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{assetId}")]
        public async Task<IActionResult> GetAssetDetailAsync(long assetId)
        {
            var res = await _assetService.GetAssetDetailAsync(assetId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddAssetDetailAsync([FromForm] AssetModel model)
        {
            var res = await _assetService.AddAssetDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{assetId}")]
        public async Task<IActionResult> UpdateAssetDetailAsync(long assetId, [FromForm] AssetModel asset)
        {

            var res = await _assetService.UpdateAssetDetailAsync(assetId, asset);

            return new ApiOkActionResult(res);
        }
    }
}
