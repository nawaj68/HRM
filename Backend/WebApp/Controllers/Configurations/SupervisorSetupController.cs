using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Service.Services.Configurations;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupervisorSetupController : GenericBaseController<SupervisorSetup>
    {
        private readonly ISupervisorSetupService _supervisorsetupService;

        public SupervisorSetupController(ISupervisorSetupService supervisorsetupService) : base(supervisorsetupService)
        {
            _supervisorsetupService = supervisorsetupService;
        }
        //[HttpGet("company_dropdown")]
        //public async Task<IActionResult> GetCompanyDropdownAsync(long? companyId = null, string searchText = null)
        //{
        //    var res = await _supervisorsetupService.GetDropdownAsync(companyId, searchText);

        //    return new ApiOkActionResult(res);
        //}
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _supervisorsetupService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _supervisorsetupService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{supervisorsetupId}")]
        public async Task<IActionResult> GetSupervisorSetupDetailAsync(long supervisorsetupId)
        {
            var res = await _supervisorsetupService.GetSupervisorSetupDetailAsync(supervisorsetupId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddSupervisorSetupDetailAsync([FromForm] SupervisorSetupModel model)
        {
            var res = await _supervisorsetupService.AddSupervisorSetupDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{supervisorsetupId}")]
        public async Task<IActionResult> UpdateSupervisorSetupDetailAsync(long supervisorsetupId, [FromForm] SupervisorSetupModel supervisorSetup)
        {

            var res = await _supervisorsetupService.UpdateSupervisorSetupDetailAsync(supervisorsetupId, supervisorSetup);

            return new ApiOkActionResult(res);
        }

    }
}
