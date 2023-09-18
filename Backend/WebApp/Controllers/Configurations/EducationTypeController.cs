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
    public class EducationTypeController : GenericBaseController<EducationType>
    {
        private readonly IEducationTypeService _educationtypeService;

        public EducationTypeController(IEducationTypeService educationtypeService) : base(educationtypeService)
        {
            _educationtypeService = educationtypeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync( string searchText = null)
        {
            var res = await _educationtypeService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _educationtypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _educationtypeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{educationtypeId}")]
        public async Task<IActionResult> GetEducationTypeDetailAsync(long educationtypeId)
        {
            var res = await _educationtypeService.GetEducationTypeDetailAsync(educationtypeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddEducationTypeDetailAsync([FromForm] EducationTypeModel model)
        {
            var res = await _educationtypeService.AddEducationTypeDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{educationtypeId}")]
        public async Task<IActionResult> UpdateEducationgrroupDetailAsync(long educationtypeId, [FromForm] EducationTypeModel educationtype)
        {

            var res = await _educationtypeService.UpdateEducationTypeDetailAsync(educationtypeId, educationtype);

            return new ApiOkActionResult(res);
        }
    }
}
