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
    public class InstituteController : GenericBaseController<Institute>
    {
        private readonly IInstituteService _instituteService;

        public InstituteController(IInstituteService instituteService) : base(instituteService)
        {
            _instituteService = instituteService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync( string searchText = null)
        {
            var res = await _instituteService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _instituteService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _instituteService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{instituteId}")]
        public async Task<IActionResult> GetInstituteDetailAsync(long instituteId)
        {
            var res = await _instituteService.GetInstituteDetailAsync(instituteId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddInstituteDetailAsync([FromForm] InstituteModel model)
        {
            var res = await _instituteService.AddInstituteDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{instituteId}")]
        public async Task<IActionResult> UpdateInstituteDetailAsync(long instituteId, [FromForm] InstituteModel institute)
        {

            var res = await _instituteService.UpdateInstituteDetailAsync(instituteId, institute);

            return new ApiOkActionResult(res);
        }
    }
}
