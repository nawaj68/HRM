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
    public class DesignationController : GenericBaseController<Designation>
    {
        private readonly IDesignationService _designationService;

        public DesignationController(IDesignationService designationService) : base(designationService)
        {
            _designationService = designationService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _designationService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _designationService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{designationId}")]
        public async Task<IActionResult> GetDesignationDetailsAsync(long designationId)
        {
            var res = await _designationService.GetDesignationDetailsAsync(designationId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddDesignationDetailsAsync([FromForm] DesignationModel model)
        {
            var res = await _designationService.AddDesignationDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{designationId}")]
        public async Task<IActionResult> UpdateDesignationDetailsAsync(long designationId, [FromForm] DesignationModel model)
        {
            var res = await _designationService.UpdateDesignationDetailsAsync(designationId, model);

            return new ApiOkActionResult(res);
        }
    }
}
