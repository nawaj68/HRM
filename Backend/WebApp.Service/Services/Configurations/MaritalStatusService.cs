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
    public class MaritalStatusService : BaseService<MaritalStatus>, IMaritalStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public MaritalStatusService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<MaritalStatusModel> AddMaritalStatusDetailsAsync(MaritalStatusModel model)
        {
            var entity = _mapper.Map<MaritalStatusModel, MaritalStatus>(model);
            await _unitOfWork.Repository<MaritalStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new MaritalStatusModel();
        }

        public async Task<MaritalStatusModel> GetMaritalStatusDetailsAsync(long meritalStatusId)
        {
            var data = await _unitOfWork.Repository<MaritalStatus>().FirstOrDefaultAsync(f=>f.Id== meritalStatusId);
            return  _mapper.Map<MaritalStatus, MaritalStatusModel>(data);
        }

        public async Task<Dropdown<MaritalStatusModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<MaritalStatus>().GetDropdownAsync(
                p=>(string.IsNullOrEmpty(searchText)|| p.MaritalStatusName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=> new MaritalStatusModel { Id = se.Id, MaritalStatusName = se.MaritalStatusName},
                size);

            return data;
        }

        public Task<Paging<MaritalStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new NotImplementedException();
        }

        public async Task<Paging<MaritalStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<MaritalStatus>().GetPageAsync(pageIndex, pageSize,
                p=>(string.IsNullOrEmpty(searchText)|p.MaritalStatusName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id));
            return data.ToPagingModel<MaritalStatus, MaritalStatusModel>(_mapper);
        }

        public async Task<MaritalStatusModel> UpdateMaritalStatusDetailsAsync(long meritalStatusId, MaritalStatusModel model)
        {
            var entity = _mapper.Map<MaritalStatusModel, MaritalStatus>(model);

            await _unitOfWork.Repository<MaritalStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new MaritalStatusModel();
        }

        public Task<MaritalStatusModel> UpdateMaritalStatusDetailsAsync(long meritalStatusId, string model)
        {
            throw new NotImplementedException();
        }

    }
}
