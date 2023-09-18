using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
using WebApp.Service.Models.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IDocumentTypeService:IBaseService<DocumentType>
    {
        Task<Paging<DocumentTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DocumentTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<DocumentTypeModel> GetDocumentTypeDetailAsync(long documentTypeId);
        Task<DocumentTypeModel> AddDocumentTypeDetailAsync(DocumentTypeModel model);
        Task<DocumentTypeModel> UpdateDocumentTypeDetailAsync(long documentTypeId, DocumentTypeModel model);
        Task<Dropdown<DocumentTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
    }
}
