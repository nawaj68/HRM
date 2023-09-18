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
    public class EducationTypeService : BaseService<EducationType>, IEducationTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EducationTypeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<EducationTypeModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<EducationType>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.EducationTypeName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new EducationTypeModel { Id = se.Id, EducationTypeName = se.EducationTypeName },
                 size
                 );
            return data;
        }
        public async Task<Paging<EducationTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<EducationType>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.EducationTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<EducationType, EducationTypeModel>(_mapper);

            return response;
        }
        public async Task<Paging<EducationTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<EducationType>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.EducationTypeName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<EducationType, EducationTypeModel>(_mapper);

            return response;
        }
        public async Task<EducationTypeModel> GetEducationTypeDetailAsync(long educationtypeId)
        {
            var data = await _unitOfWork.Repository<EducationType>().FirstOrDefaultAsync(f => f.Id == educationtypeId,
                o => o.OrderBy(ob => ob.Id),
                i => i.CompanyInfo
                );


            var response = _mapper.Map<EducationType, EducationTypeModel>(data);

            return response;
        }
        public async Task<EducationTypeModel> AddEducationTypeDetailAsync(EducationTypeModel educationtype)
        {


            var entity = _mapper.Map<EducationTypeModel, EducationType>(educationtype);

            await _unitOfWork.Repository<EducationType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EducationTypeModel();
        }
        public async Task<EducationTypeModel> UpdateEducationTypeDetailAsync(long educationtypeId, EducationTypeModel educationtype)
        {
            var entity = _mapper.Map<EducationTypeModel, EducationType>(educationtype);

            await _unitOfWork.Repository<EducationType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EducationTypeModel();
        }
        public async Task<EducationTypeModel> UpdateEducationTypeDetailAsync(long educationtypeId, string model)
        {
            var educationtype = JsonConvert.DeserializeObject<EducationTypeModel>(model);
            var entity = _mapper.Map<EducationTypeModel, EducationType>(educationtype);

            await _unitOfWork.Repository<EducationType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EducationTypeModel();
        }
    }
}
