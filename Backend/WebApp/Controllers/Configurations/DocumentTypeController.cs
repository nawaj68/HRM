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
    public class DocumentTypeController : GenericBaseController<DocumentType>
    {
        private readonly IDocumentTypeService _documentTypeService;
        public DocumentTypeController(IDocumentTypeService documentTypeService) : base(documentTypeService)
        {
            _documentTypeService = documentTypeService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _documentTypeService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _documentTypeService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _documentTypeService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{documentTypeId}")]
        public async Task<IActionResult> GetDocumentTypeDetailAsync(long documentTypeId)
        {
            var res = await _documentTypeService.GetDocumentTypeDetailAsync(documentTypeId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddDocumentTypeDetailAsync([FromForm] DocumentTypeModel model)
        {
            var res = await _documentTypeService.AddDocumentTypeDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{documentTypeId}")]
        public async Task<IActionResult> UpdateDocumentTypeDetailAsync(long documentTypeId, [FromForm] DocumentTypeModel documentType)
        {

            var res = await _documentTypeService.UpdateDocumentTypeDetailAsync(documentTypeId, documentType);

            return new ApiOkActionResult(res);
        }
    }
}
