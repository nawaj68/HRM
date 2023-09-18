using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class HobbyTypeController : GenericBaseController<HobbyType>
    {
        private readonly IHobbyTypeService _hobbyTypeService;

        public HobbyTypeController(IHobbyTypeService hobbyTypeService) : base(hobbyTypeService)
        {
            this._hobbyTypeService = hobbyTypeService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _hobbyTypeService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _hobbyTypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _hobbyTypeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{hobbyTypeId}")]
        public async Task<IActionResult> GetHobbyTypeDetailsAsync(long hobbyTypeId)
        {
            var res = await _hobbyTypeService.GetHobbyTypeDetailsAsync(hobbyTypeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddHobbyTypeDetailsAsync([FromForm] HobbyTypeModel model)
        {
            var res = await _hobbyTypeService.AddHobbyTypeDetailsAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{hobbyTypeId}")]
        public async Task<IActionResult> UpdateHobbyTypeDetailsAsync(long hobbyTypeId, [FromForm] HobbyTypeModel model)
        {

            var res = await _hobbyTypeService.UpdateHobbyTypeDetailsAsync(hobbyTypeId, model);

            return new ApiOkActionResult(res);
        }
    }
}
