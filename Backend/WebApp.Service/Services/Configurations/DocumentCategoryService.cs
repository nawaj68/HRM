using AutoMapper;
using Newtonsoft.Json;
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
    public class DocumentCategoryService : BaseService<DocumentCategorie>, IDocumentCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DocumentCategoryService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<DocumentCategoryModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<DocumentCategorie>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.DocumentCategorieName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new DocumentCategoryModel { Id = se.Id, DocumentCategorieName = se.DocumentCategorieName },
                 size
                 );
            return data;
        }
        public async Task<Paging<DocumentCategoryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<DocumentCategorie>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.DocumentCategorieName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<DocumentCategorie, DocumentCategoryModel>(_mapper);

            return response;
        }
        public async Task<Paging<DocumentCategoryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<DocumentCategorie>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.DocumentCategorieName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<DocumentCategorie, DocumentCategoryModel>(_mapper);

            return response;
        }
        public async Task<DocumentCategoryModel> GetDocumentCategorieDetailAsync(long documentcategorieId)
        {
            var data = await _unitOfWork.Repository<DocumentCategorie>().FirstOrDefaultAsync(f => f.Id == documentcategorieId,
                o => o.OrderBy(ob => ob.Id),
                i => i.CompanyInfo
                );


            var response = _mapper.Map<DocumentCategorie, DocumentCategoryModel>(data);

            return response;
        }
        public async Task<DocumentCategoryModel> AddDocumentCategorieDetailAsync(DocumentCategoryModel documentcategorie)
        {


            var entity = _mapper.Map<DocumentCategoryModel, DocumentCategorie>(documentcategorie);

            await _unitOfWork.Repository<DocumentCategorie>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DocumentCategoryModel();
        }
        public async Task<DocumentCategoryModel> UpdateDocumentCategorieDetailAsync(long documentcategorieId, DocumentCategoryModel documentcategorie)
        {
            var entity = _mapper.Map<DocumentCategoryModel, DocumentCategorie>(documentcategorie);

            await _unitOfWork.Repository<DocumentCategorie>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DocumentCategoryModel();
        }
        public async Task<DocumentCategoryModel> UpdateDocumentCategorieDetailAsync(long documentcategorieId, string model)
        {
            var documentcategorie = JsonConvert.DeserializeObject<DocumentCategoryModel>(model);
            var entity = _mapper.Map<DocumentCategoryModel, DocumentCategorie>(documentcategorie);

            await _unitOfWork.Repository<DocumentCategorie>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DocumentCategoryModel();
        }
    }
}
