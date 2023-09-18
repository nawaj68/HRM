using AutoMapper;
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
    public class DocumentTypeService : BaseService<DocumentType>, IDocumentTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DocumentTypeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DocumentTypeModel> AddDocumentTypeDetailAsync(DocumentTypeModel model)
        {
            var entity = _mapper.Map<DocumentTypeModel, DocumentType>(model);
            await _unitOfWork.Repository<DocumentType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DocumentTypeModel();
        }

        public async Task<DocumentTypeModel> GetDocumentTypeDetailAsync(long documentTypeId)
        {
            var data = await _unitOfWork.Repository<DocumentType>().FirstOrDefaultAsync(f => f.Id == documentTypeId,
                o => o.OrderBy(ob => ob.Id),
                i => i);
            return _mapper.Map<DocumentType, DocumentTypeModel>(data);
        }

        public async Task<Dropdown<DocumentTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<DocumentType>().GetDropdownAsync(
                p => (string.IsNullOrEmpty(searchText) || p.DocumentTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => new DocumentTypeModel { Id = se.Id, DocumentTypeName = se.DocumentTypeName },
                size);
            return data;
        }

        public async Task<Paging<DocumentTypeModel>> GetFilterAsync(int pageIndex =CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<DocumentType>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.DocumentTypeName.Contains(filterText1))),
                o => o.OrderBy(ob => ob.Id),
                se => se
                );
            var response = data.ToPagingModel<DocumentType, DocumentTypeModel>(_mapper);
            return response;
        }

        public async Task<Paging<DocumentTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<DocumentType>().GetPageAsync(pageIndex, pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.DocumentTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se
                );
            var res = data.ToPagingModel<DocumentType, DocumentTypeModel>(_mapper);
            return res;
        }

        public async Task<DocumentTypeModel> UpdateDocumentTypeDetailAsync(long documentTypeId, DocumentTypeModel model)
        {
            var entity = _mapper.Map<DocumentTypeModel, DocumentType>(model);
            await _unitOfWork.Repository<DocumentType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DocumentTypeModel();
        }
    }
}
