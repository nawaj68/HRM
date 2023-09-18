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
    public class AssetTypeController : GenericBaseController<AssetType>
    {
        private readonly IAssetTypeService _assetTypeService;
        public AssetTypeController(IAssetTypeService assetTypeService) : base(assetTypeService)
        {
            _assetTypeService = assetTypeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _assetTypeService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _assetTypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _assetTypeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{assetTypeId}")]
        public async Task<IActionResult> GetAssetTypeDetailAsync(long assetTypeId)
        {
            var res = await _assetTypeService.GetAssetTypeDetailAsync(assetTypeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddAssetTypeDetailAsync([FromForm] AssetTypeModel model)
        {
            var res = await _assetTypeService.AddAssetTypeDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{assetTypeId}")]
        public async Task<IActionResult> UpdateAssetTypeDetailAsync(long assetTypeId, [FromForm] AssetTypeModel assetType)
        {

            var res = await _assetTypeService.UpdateAssetTypeDetailAsync(assetTypeId, assetType);

            return new ApiOkActionResult(res);
        }

    }
}
