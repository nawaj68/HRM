using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Services.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewJobStatusController : GenericBaseController<NewJobStatus>
    {
        private readonly INewJobStatusService _newjobstatusService;

        public NewJobStatusController(INewJobStatusService newjobstatusService) : base(newjobstatusService)
        {
            _newjobstatusService = newjobstatusService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _newjobstatusService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _newjobstatusService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{newjobstatusId}")]
        public async Task<IActionResult> GetNewJobStatusDetailAsync(long newjobstatusId)
        {
            var res = await _newjobstatusService.GetNewJobStatusDetailAsync(newjobstatusId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddNewJobStatusDetailAsync([FromForm] NewJobStatusModel model)
        {
            var res = await _newjobstatusService.AddNewJobStatusDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{newjobstatusId}")]
        public async Task<IActionResult> UpdateNewJobStatusDetailAsync(long newjobstatusId, [FromForm] NewJobStatusModel newjobstatus)
        {

            var res = await _newjobstatusService.UpdateNewJobStatusDetailAsync(newjobstatusId, newjobstatus);

            return new ApiOkActionResult(res);
        }
    }
}
