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
    public class ClaimTypeService : BaseService<ClaimType> , IClaimTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ClaimTypeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<ClaimTypeModel>> GetDropdownAsync(string searchText = null,
    int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<ClaimType>().GetDropdownAsync(
                s => ((string.IsNullOrEmpty(searchText) || s.CliamTypeName.Contains(searchText))),
                o => o.OrderBy(ob => ob.Id),
                se => new ClaimTypeModel { Id = se.Id, CliamTypeName = se.CliamTypeName },
                size);

            return data;
        }

        public async Task<ClaimTypeModel> AddClaimTypeDetailsAsync(ClaimTypeModel model)
        {
            var entity = _mapper.Map<ClaimTypeModel, ClaimType>(model);

            await _unitOfWork.Repository<ClaimType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ClaimTypeModel();
        }

        public async Task<ClaimTypeModel> GetClaimTypeDetailsAsync(long countryId)
        {
            var data = await _unitOfWork.Repository<ClaimType>().FirstOrDefaultAsync(f => f.Id == countryId);

            var response = _mapper.Map<ClaimType, ClaimTypeModel>(data);

            return response;
        }
        public Task<Paging<ClaimTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Paging<ClaimTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<ClaimType>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(searchText) | p.CliamTypeName.Contains(searchText) ),
                o => o.OrderBy(ob => ob.Id));

            var response = data.ToPagingModel<ClaimType, ClaimTypeModel>(_mapper);

            return response;
        }

        public async Task<ClaimTypeModel> UpdateClaimTypeDetailsAsync(long claimTypeId, ClaimTypeModel model)
        {
            var entity = _mapper.Map<ClaimTypeModel, ClaimType>(model);

            await _unitOfWork.Repository<ClaimType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ClaimTypeModel();
        }

        public Task<ClaimTypeModel> UpdateClaimTypeDetailsAsync(long claimTypeId, string model)
        {
            throw new System.NotImplementedException();
        }
    }
}
