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
    public class EducationGroupService : BaseService<EducationGroup>,IEducationGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EducationGroupService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<EducationGroupModel>> GetDropdownAsync(long? companyId = null,
    string searchText = null,
    int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<EducationGroup>().GetDropdownAsync(
                s => (string.IsNullOrEmpty(searchText) || s.EducationGroupName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => new EducationGroupModel { Id = se.Id, EducationGroupName = se.EducationGroupName},
                size);

            return data;
        }

        public async Task<Paging<EducationGroupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<EducationGroup>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.EducationGroupName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<EducationGroup, EducationGroupModel>(_mapper);

            return response;
        }
        public async Task<Paging<EducationGroupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository< EducationGroup> ().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.EducationGroupName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<EducationGroup, EducationGroupModel>(_mapper);

            return response;
        }
        public async Task<EducationGroupModel> GetEducationgroupDetailAsync(long educationgroupId)
        {
            var data = await _unitOfWork.Repository<EducationGroup>().FirstOrDefaultAsync(f => f.Id == educationgroupId,
                o => o.OrderBy(ob => ob.Id),
                i => i.CompanyInfo 
                );


            var response = _mapper.Map<EducationGroup, EducationGroupModel>(data);

            return response;
        }
        public async Task<EducationGroupModel> AddEducationgroupDetailAsync(EducationGroupModel educationgroup)
        {


            var entity = _mapper.Map<EducationGroupModel, EducationGroup>(educationgroup);

            await _unitOfWork.Repository<EducationGroup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EducationGroupModel();
        }
        public async Task<EducationGroupModel> UpdateEducationgroupDetailAsync(long educationgroupId, EducationGroupModel educationgroup)
        {
            var entity = _mapper.Map<EducationGroupModel, EducationGroup>(educationgroup);

            await _unitOfWork.Repository<EducationGroup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EducationGroupModel();
        }
        public async Task<EducationGroupModel> UpdateEducationgroupDetailAsync(long educationgroupId, string model)
        {
            var educationgroup= JsonConvert.DeserializeObject<EducationGroupModel>(model);
            var entity = _mapper.Map<EducationGroupModel, EducationGroup>(educationgroup);

            await _unitOfWork.Repository<EducationGroup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EducationGroupModel();
        }
    }
}
