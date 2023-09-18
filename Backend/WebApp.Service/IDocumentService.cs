using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IDocumentService:IBaseService<Document>
    {
        Task<Paging<DocumentModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DocumentModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<DocumentModel> GetDocumentDetailAsync(long documentId);
        Task<DocumentModel> AddDocumentDetailAsync(DocumentModel model);
        Task<DocumentModel> UpdateDocumentDetailAsync(long documentId, DocumentModel model);
        Task<DocumentModel> UpdateDocumentDetailAsync(long documentId, string model, List<IFormFile> images);
    }
}
