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
    public class CompanyInfoController : GenericBaseController<CompanyInfo>
    {
        private readonly ICompanyInfoService _companyInfoService;
        public CompanyInfoController(ICompanyInfoService companyInfoService) : base(companyInfoService)
        {
            _companyInfoService = companyInfoService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _companyInfoService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _companyInfoService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _companyInfoService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{companyInfoId}")]
        public async Task<IActionResult> GetCompanyInfoDetailAsync(long companyInfoId)
        {
            var res = await _companyInfoService.GetCompanyInfoDetailAsync(companyInfoId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddCompanyInfoDetailAsync([FromForm] CompanyInfoModel model)
        {
            var res = await _companyInfoService.AddCompanyInfoDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{companyInfoId}")]
        public async Task<IActionResult> UpdateCompanyInfoDetailAsync(long companyInfoId, [FromForm] CompanyInfoModel companyInfo)
        {

            var res = await _companyInfoService.UpdateCompanyInfoDetailAsync(companyInfoId, companyInfo);

            return new ApiOkActionResult(res);
        }
    }
}
