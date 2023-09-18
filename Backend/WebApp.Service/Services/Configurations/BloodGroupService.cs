using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services.Configurations
{
    internal class BloodGroupService : BaseService<BloodGroup>, IBloodGroupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BloodGroupService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BloodGroupModel> AddBloodGroupDetailsAsync(BloodGroupModel model)
        {
            var entity = _mapper.Map<BloodGroupModel, BloodGroup>(model);

            await _unitOfWork.Repository<BloodGroup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new BloodGroupModel();
        }

        public async Task<BloodGroupModel> GetBloodGroupDetailsAsync(long bloodgroupId)
        {
            var data = await _unitOfWork.Repository<BloodGroup>().FirstOrDefaultAsync(f => f.Id == bloodgroupId);

            var response = _mapper.Map<BloodGroup, BloodGroupModel>(data);

            return response;
        }

        public async Task<Dropdown<BloodGroupModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<BloodGroup>().GetDropdownAsync(
                p => (string.IsNullOrEmpty(searchText) || p.BloodGroupName.Contains(searchText)),
                o=> o.OrderBy(ob=>ob.Id),
                se=> new BloodGroupModel { Id=se.Id, BloodGroupName= se.BloodGroupName},
                size
                );
            return data;
        }

        public Task<Paging<BloodGroupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Paging<BloodGroupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<BloodGroup>().GetPageAsync(pageIndex,pageSize,
                p=>string.IsNullOrEmpty(searchText)|(p.BloodGroupName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se);

            var response = data.ToPagingModel<BloodGroup, BloodGroupModel>(_mapper);

            return response;
        }

        public Task<BloodGroupModel> UpdateBloodGroupDetailsAsync(long bloodgroupId, string model)
        {
            throw new NotImplementedException();
        }

        public async Task<BloodGroupModel> UpdateBloodGroupDetailsAsync(long bloodgroupId, BloodGroupModel model)
        {
            var entity = _mapper.Map<BloodGroupModel, BloodGroup>(model);

            await _unitOfWork.Repository<BloodGroup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new BloodGroupModel();
        }
    }
}
