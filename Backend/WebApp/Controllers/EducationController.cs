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
    public class EducationController : GenericBaseController<Education>
    {
        private readonly IEducationService _educationService;

        public EducationController(IEducationService educationService) : base(educationService)
        {
            this._educationService = educationService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _educationService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _educationService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{educationId}")]
        public async Task<IActionResult> GetEducationDetailsAsync(long educationId)
        {
            var res = await _educationService.GetEducationDetailsAsync(educationId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddEducationDetailsAsync([FromForm] EducationModel model)
        {
            var res = await _educationService.AddEducationDetailsAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{educationId}")]
        public async Task<IActionResult> UpdateEducationDetailsAsync(long educationId, [FromForm] EducationModel model)
        {

            var res = await _educationService.UpdateEducationDetailsAsync(educationId, model);

            return new ApiOkActionResult(res);
        }
    }
}
