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
    public class JobBaseStatusController : GenericBaseController<JobBaseStatus>
    {
        private readonly IJobBaseStatusService _jobbasestatusService;

        public JobBaseStatusController(IJobBaseStatusService jobbasestatusService) : base(jobbasestatusService)
        {
            _jobbasestatusService = jobbasestatusService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _jobbasestatusService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _jobbasestatusService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{jobbasestatusId}")]
        public async Task<IActionResult> GetJobBaseStatusDetailAsync(long jobbasestatusId)
        {
            var res = await _jobbasestatusService.GetJobBaseStatusDetailAsync(jobbasestatusId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddJobBaseStatusDetailAsync([FromForm] JobBaseStatusModel model)
        {
            var res = await _jobbasestatusService.AddJobBaseStatusDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{jobbasestatusId}")]
        public async Task<IActionResult> UpdateJobBaseStatusDetailAsync(long jobbasestatusId, [FromForm] JobBaseStatusModel jobbasestatus)
        {

            var res = await _jobbasestatusService.UpdateJobBaseStatusDetailAsync(jobbasestatusId, jobbasestatus);

            return new ApiOkActionResult(res);
        }
    }
}

