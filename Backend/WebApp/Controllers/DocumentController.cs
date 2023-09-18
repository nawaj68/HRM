using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
    public class DocumentController : GenericBaseController<Document>
    {
        private readonly IDocumentService _documentService;
        public DocumentController(IDocumentService documentService):base(documentService)
        {
            this._documentService = documentService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _documentService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _documentService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{documentId}")]
        public async Task<IActionResult> GetDocumentDetailAsync(long documentId)
        {
            var res = await _documentService.GetDocumentDetailAsync(documentId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddDocumentDetailAsync([FromForm] DocumentModel model)
        {
            var res = await _documentService.AddDocumentDetailAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{documentId}")]
        public async Task<IActionResult> UpdateEmployeesDetailAsync(long documentId, [FromForm] DocumentModel documents)
        {

            var res = await _documentService.UpdateDocumentDetailAsync(documentId, documents);

            return new ApiOkActionResult(res);
        }
    }
}

