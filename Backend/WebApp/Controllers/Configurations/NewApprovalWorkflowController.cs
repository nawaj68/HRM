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
    public class NewApprovalWorkflowController : GenericBaseController<NewApprovalWorkflow>
    {
        private readonly INewApprovalWorkflowService _newapprovalworkflowService;

        public NewApprovalWorkflowController(INewApprovalWorkflowService newapprovalworkflowService) : base(newapprovalworkflowService)
        {
            _newapprovalworkflowService = newapprovalworkflowService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetCompanyDropdownAsync( string searchText = null)
        {
            var res = await _newapprovalworkflowService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _newapprovalworkflowService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _newapprovalworkflowService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{newApprovalWorkflowId}")]
        public async Task<IActionResult> GetNewapprovalworkflowDetailAsync(long newApprovalWorkflowId)
        {
            var res = await _newapprovalworkflowService.GetNewapprovalworkflowDetailAsync(newApprovalWorkflowId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddNewapprovalworkflowDetailAsync([FromForm] NewApprovalWorkflowModel model)
        {
            var res = await _newapprovalworkflowService.AddNewapprovalworkflowDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{newApprovalWorkflowId}")]
        public async Task<IActionResult> UpdateNewapprovalworkflowDetailAsync(long newApprovalWorkflowId, [FromForm] NewApprovalWorkflowModel newApprovalWorkflow)
        {

            var res = await _newapprovalworkflowService.UpdateNewapprovalworkflowDetailAsync(newApprovalWorkflowId, newApprovalWorkflow);

            return new ApiOkActionResult(res);
        }
    }
}
