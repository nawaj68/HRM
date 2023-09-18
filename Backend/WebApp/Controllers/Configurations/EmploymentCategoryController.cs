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
    public class EmploymentCategoryController : GenericBaseController<EmploymentCategorie>
    {
        private readonly IEmploymentCategoryService _employmentcategoriService;

        public EmploymentCategoryController(IEmploymentCategoryService employmentcategoriService) : base(employmentcategoriService)
        {
            _employmentcategoriService = employmentcategoriService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetCompanyDropdownAsync( string searchText = null)
        {
            var res = await _employmentcategoriService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _employmentcategoriService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _employmentcategoriService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{employmentcategorieId}")]
        public async Task<IActionResult> GetEmploymentCategorieDetailAsync(long employmentcategorieId)
        {
            var res = await _employmentcategoriService.GetEmploymentCategorieDetailAsync(employmentcategorieId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddEmploymentCategorieDetailAsync([FromForm] EmploymentCategoryModel model)
        {
            var res = await _employmentcategoriService.AddEmploymentCategorieDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{employmentcategorieId}")]
        public async Task<IActionResult> UpdateEmploymentCategorieDetailAsync(long employmentcategorieId, [FromForm] EmploymentCategoryModel employmentcategorie)
        {

            var res = await _employmentcategoriService.UpdateEmploymentCategorieDetailAsync(employmentcategorieId, employmentcategorie);

            return new ApiOkActionResult(res);
        }
    }
}
