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
    public class ProjectController : GenericBaseController<Project>
    {
        private readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService) : base(projectService)
        {
            _projectService = projectService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _projectService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _projectService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _projectService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetProjectDetailAsync(long projectId)
        {
            var res = await _projectService.GetProjectDetailAsync(projectId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddProjectDetailAsync([FromForm] ProjectModel model)
        {
            var res = await _projectService.AddProjectDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{projectId}")]
        public async Task<IActionResult> UpdateProjectDetailAsync(long projectId, [FromForm] ProjectModel project)
        {

            var res = await _projectService.UpdateProjectDetailAsync(projectId, project);

            return new ApiOkActionResult(res);
        }

    }
}
