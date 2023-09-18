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
    public class SupervisorController : GenericBaseController<Supervisor>
    {
        private readonly ISupervisorService _supervisorService;
        public SupervisorController(ISupervisorService supervisorService):base(supervisorService)
        {
            this._supervisorService = supervisorService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex=CommonVariables.pageIndex,int pageSize=CommonVariables.pageSize,string searchText=null)
        {
            var res = await _supervisorService.GetSearchAsync(pageIndex, pageSize, searchText);
            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex=CommonVariables.pageIndex,int pageSize=CommonVariables.pageSize,string filterText1 = null)
        {
            var res = await _supervisorService.GetFilterAsync(pageIndex, pageSize, filterText1);
            return new ApiOkActionResult(res);
        }
        [HttpGet("{supervisorId}")]
        public async Task<IActionResult> GetSupervisorDetailAsync(long supervisorId)
        {
            var res=await _supervisorService.GetSupervisorDetailAsync(supervisorId);
            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddSupervisorDetailAsync([FromForm] SupervisorModel model)
        {
            var res = await _supervisorService.AddSupervisorDetailAsync(model);
            return new ApiOkActionResult(res);
        }
        [HttpPut("{supervisorId}")]
        public async Task<IActionResult> UpdateSupervisorDetailAsync(long supervisorId, [FromForm] SupervisorModel supervsor)
        {
            var res = await _supervisorService.UpdateSupervisorDetailAsync(supervisorId, supervsor);
            return new ApiOkActionResult(res);
        }
    }
}
