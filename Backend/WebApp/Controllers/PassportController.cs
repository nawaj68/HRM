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
    public class PassportController : GenericBaseController<Passport>
    {
        private readonly IPassportService _passportService;
        public PassportController(IPassportService passportService) : base(passportService)
        {
            this._passportService = passportService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _passportService.GetSearchAsync(pageIndex, pageSize, searchText);
            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var res = await _passportService.GetFilterAsync(pageIndex, pageSize, filterText1);
            return new ApiOkActionResult(res);
        }
        [HttpGet("{passportId}")]
        public async Task<IActionResult> GetPassportDetailAsync(long passportId)
        {
            var res = await _passportService.GetPassportDetailAsync(passportId);
            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddPassportDetailAsync([FromForm] PassportModel model)
        {
            var res = await _passportService.AddPassportDetailAsync(model);
            return new ApiOkActionResult(res);
        }
        [HttpPut("{passportId}")]
        public async Task<IActionResult> UpdatePassportDetailAsync(long passportId, [FromForm] PassportModel passport)
        {
            var res = await _passportService.UpdatePassportDetailAsync(passportId, passport);
            return new ApiOkActionResult(res);
        }
    }
}
