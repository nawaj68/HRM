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
    public class BankInfoController : GenericBaseController<BankInfo>
    {
        private readonly IBankInfoService _bankInfoService;
        public BankInfoController(IBankInfoService bankInfoService):base(bankInfoService)
        {
            this._bankInfoService = bankInfoService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _bankInfoService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _bankInfoService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{bankInfoId}")]
        public async Task<IActionResult> GetBankInfoDetailAsync(long bankInfoId)
        {
            var res = await _bankInfoService.GetBankInfoDetailAsync(bankInfoId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddBankInfoDetailAsync([FromForm] BankInfoModel bankinfo)
        {
            var res = await _bankInfoService.AddBankInfoDetailAsync(bankinfo);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{bankInfoId}")]
        public async Task<IActionResult> UpdateBankInfoDetailAsync(long bankInfoId, [FromForm] BankInfoModel bankinfo)
        {

            var res = await _bankInfoService.UpdateBankInfoDetailAsync(bankInfoId, bankinfo);

            return new ApiOkActionResult(res);
        }

    }
}
