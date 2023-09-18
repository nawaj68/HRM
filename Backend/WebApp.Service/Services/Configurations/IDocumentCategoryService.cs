using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IDocumentCategoryService : IBaseService<DocumentCategorie>
    {
        Task<Dropdown<DocumentCategoryModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<DocumentCategoryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DocumentCategoryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<DocumentCategoryModel> GetDocumentCategorieDetailAsync(long documentcategorieId);
        Task<DocumentCategoryModel> AddDocumentCategorieDetailAsync(DocumentCategoryModel model);
        Task<DocumentCategoryModel> UpdateDocumentCategorieDetailAsync(long documentcategorieId, DocumentCategoryModel model);
        Task<DocumentCategoryModel> UpdateDocumentCategorieDetailAsync(long documentcategorieId, string model);
    }
}
