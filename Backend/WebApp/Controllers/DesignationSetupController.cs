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
    public class DesignationSetupController : GenericBaseController<DesignationSetup>
    {
        private readonly IDesignationSetupService _designationSetupService;

        public DesignationSetupController(IDesignationSetupService designationSetupService) : base(designationSetupService)
        {
            this._designationSetupService = designationSetupService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _designationSetupService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _designationSetupService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{designationSetupId}")]
        public async Task<IActionResult> GetDesignationSetupDetailAsync(long designationSetupId)
        {
            var res = await _designationSetupService.GetDesignationSetupDetailAsync(designationSetupId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddDepartmentSetupDetailAsync([FromForm] DesignationSetupModel model)
        {
            var res = await _designationSetupService.AddDesignationSetupDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{designationSetupId}")]
        public async Task<IActionResult> UpdateDepartmentSetupDetailAsync(long contactId, [FromForm] DesignationSetupModel model)
        {
            var res = await _designationSetupService.UpdateDesignationSetupDetailAsync(contactId, model);
            return new ApiOkActionResult(res);
        }


    }
}
