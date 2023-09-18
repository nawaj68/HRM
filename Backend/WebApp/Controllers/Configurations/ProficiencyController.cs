using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProficiencyController : GenericBaseController<Proficiency>
    {
        private readonly IProficiencyService _proficiencyService;

        public ProficiencyController(IProficiencyService proficiencyService) : base(proficiencyService)
        {
            this._proficiencyService = proficiencyService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _proficiencyService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _proficiencyService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{proficiencyId}")]
        public async Task<IActionResult> GetProficiencyDetailsAsync(long proficiencyId)
        {
            var res = await _proficiencyService.GetProficiencyDetailsAsync(proficiencyId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddProficiencyDetailsAsync([FromForm] ProficiencyModel model)
        {
            var res = await _proficiencyService.AddProficiencyDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{proficiencyId}")]
        public async Task<IActionResult> UpdateProficiencyDetailsAsync( [FromForm] ProficiencyModel model)
        {
            var res = await _proficiencyService.UpdateProficiencyDetailsAsync(model);

            return new ApiOkActionResult(res);
        }
    }
}
