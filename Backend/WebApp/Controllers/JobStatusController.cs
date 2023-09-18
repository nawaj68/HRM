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
    public class JobStatusController : GenericBaseController<JobStatus>
    {
        private readonly IJobStatusService _jobStatusService;

        public JobStatusController(IJobStatusService jobStatusService) : base(jobStatusService)
        {
            this._jobStatusService = jobStatusService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _jobStatusService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _jobStatusService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{jobStatusId}")]
        public async Task<IActionResult> GetJobStatusDetailAsync(long jobStatusId)
        {
            var res = await _jobStatusService.GetJobStatusDetailAsync(jobStatusId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddJobStatusDetailAsync([FromForm] JobStatusModel model)
        {
            var res = await _jobStatusService.AddJobStatusDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{jobStatusId}")]
        public async Task<IActionResult> UpdateJobStatusDetailAsync(long jobStatusId, [FromForm] JobStatusModel model)
        {

            var res = await _jobStatusService.UpdateJobStatusDetailAsync(jobStatusId, model);

            return new ApiOkActionResult(res);
        }
    }
}
