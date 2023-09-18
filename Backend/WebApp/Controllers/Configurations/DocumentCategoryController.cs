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
    public class DocumentCategoryController : GenericBaseController<DocumentCategorie>
    {
        private readonly IDocumentCategoryService _documentcategoryService;

        public DocumentCategoryController(IDocumentCategoryService documentcategoryService) : base(documentcategoryService)
        {
            _documentcategoryService = documentcategoryService;
        }
        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync( string searchText = null)
        {
            var res = await _documentcategoryService.GetDropdownAsync( searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _documentcategoryService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _documentcategoryService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{documentcategorieId}")]
        public async Task<IActionResult> GetDocumentCategorieDetailAsync(long documentcategorieId)
        {
            var res = await _documentcategoryService.GetDocumentCategorieDetailAsync(documentcategorieId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddDocumentCategorieDetailAsync([FromForm] DocumentCategoryModel model)
        {
            var res = await _documentcategoryService.AddDocumentCategorieDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{documentcategorieId}")]
        public async Task<IActionResult> UpdateEmploymentCategorieDetailAsync(long documentcategorieId, [FromForm] DocumentCategoryModel documentcategorie)
        {

            var res = await _documentcategoryService.UpdateDocumentCategorieDetailAsync(documentcategorieId, documentcategorie);

            return new ApiOkActionResult(res);
        }
    }
}
