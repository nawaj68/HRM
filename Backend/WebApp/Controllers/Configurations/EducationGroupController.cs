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
    public class EducationGroupController : GenericBaseController<EducationGroup>
    {
        private readonly IEducationGroupService _educationgroupService;

        public EducationGroupController(IEducationGroupService educationgroupService) : base(educationgroupService)
        {
            _educationgroupService = educationgroupService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(long? companyId = null, string searchText = null)
        {
            var res = await _educationgroupService.GetDropdownAsync(companyId, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _educationgroupService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _educationgroupService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{educationgroupId}")]
        public async Task<IActionResult> GetEducationgroupDetailAsync(long educationgroupId)
        {
            var res = await _educationgroupService.GetEducationgroupDetailAsync(educationgroupId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddEducationgroupDetailAsync([FromForm] EducationGroupModel model)
        {
            var res = await _educationgroupService.AddEducationgroupDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{educationgroupId}")]
        public async Task<IActionResult> UpdateEducationgrroupDetailAsync(long educationgroupId, [FromForm] EducationGroupModel educationgroup)
        {

            var res = await _educationgroupService.UpdateEducationgroupDetailAsync(educationgroupId, educationgroup);

            return new ApiOkActionResult(res);
        }
    }
}
