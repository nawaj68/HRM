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
    public class WorkflowMappingController : GenericBaseController<WorkflowMaping>
    {
        private readonly IWorkflowMappingService _workflowmappingService;

        public WorkflowMappingController(IWorkflowMappingService workflowmappingService) : base(workflowmappingService)
        {
            _workflowmappingService = workflowmappingService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _workflowmappingService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _workflowmappingService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{workflowMappingId}")]
        public async Task<IActionResult> GetWorkflowMappingDetailAsync(long workflowMappingId)
        {
            var res = await _workflowmappingService.GetWorkflowMappingDetailAsync(workflowMappingId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddWorkflowMappingDetailAsync([FromForm] WorkflowMappingModel model)
        {
            var res = await _workflowmappingService.AddWorkflowMappingDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{workflowMappingId}")]
        public async Task<IActionResult> UpdateWorkflowMappingDetailAsync(long workflowMappingId, [FromForm] WorkflowMappingModel workflowMapping)
        {

            var res = await _workflowmappingService.UpdateWorkflowMappingDetailAsync(workflowMappingId, workflowMapping);

            return new ApiOkActionResult(res);
        }
    }
}
