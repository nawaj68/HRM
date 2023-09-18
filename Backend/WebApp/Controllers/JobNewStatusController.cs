using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models.Enrols;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobNewStatusController : GenericBaseController<JobNewStatus>
    {
        private readonly IJobNewStatusService _jobNewStatusService;
        public JobNewStatusController(IJobNewStatusService jobNewStatusService) : base(jobNewStatusService)
        {
            this._jobNewStatusService = jobNewStatusService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _jobNewStatusService.GetSearchAsync(pageIndex, pageSize, searchText);
            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var res = await _jobNewStatusService.GetFilterAsync(pageIndex, pageSize, filterText1);
            return new ApiOkActionResult(res);
        }
        [HttpGet("{jobNewStatusId}")]
        public async Task<IActionResult> GetJobNewStatusDetailAsync(long jobNewStatusId)
        {
            var res = await _jobNewStatusService.GetJobNewStatusDetailAsync(jobNewStatusId);
            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddJobNewStatusDetailAsync([FromForm] JobNewStatusModel model)
        {
            var res = await _jobNewStatusService.AddJobNewStatusDetailAsync(model);
            return new ApiOkActionResult(res);
        }
        [HttpPut("{jobNewStatusId}")]
        public async Task<IActionResult> UpdateJobNewStatusDetailAsync(long jobNewStatusId, [FromForm] JobNewStatusModel jobNewStatus)
        {
            var res = await _jobNewStatusService.UpdateJobNewStatusDetailAsync(jobNewStatusId, jobNewStatus);
            return new ApiOkActionResult(res);
        }
    }
}
