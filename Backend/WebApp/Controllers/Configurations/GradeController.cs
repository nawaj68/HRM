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
    public class GradeController : GenericBaseController<Grade>
    {
        private readonly IGradeService _gradeService;

        public GradeController(IGradeService gradeService) : base(gradeService)
        {
            _gradeService = gradeService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync( string searchText = null)
        {
            var res = await _gradeService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _gradeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _gradeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{gradeId}")]
        public async Task<IActionResult> GetGradeDetailAsync(long gradeId)
        {
            var res = await _gradeService.GetGradeDetailAsync(gradeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddGradeDetailAsync([FromForm] GradeModel model)
        {
            var res = await _gradeService.AddGradeDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{gradeId}")]
        public async Task<IActionResult> UpdateGradeDetailAsync(long gradeId, [FromForm]GradeModel grade)
        {

            var res = await _gradeService.UpdateGradeDetailAsync(gradeId, grade);

            return new ApiOkActionResult(res);
        }
    }
}
