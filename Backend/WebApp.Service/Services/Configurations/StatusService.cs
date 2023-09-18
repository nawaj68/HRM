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
    public class StatusService : BaseService<Status>, IStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public StatusService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<StatusModel> AddStatusDetailsAsync(StatusModel model)
        {
            var entity = _mapper.Map<StatusModel, Status>(model);
            await _unitOfWork.Repository<Status>().InsertAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new StatusModel();
        }

        public async Task<Dropdown<StatusModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Status>().GetDropdownAsync(
                p=>(string.IsNullOrEmpty(searchText)||p.StatusName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=> new StatusModel { Id = se.Id, StatusName=se.StatusName},
                size);
            return data;
        }

        public async Task<Paging<StatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Status>().GetPageAsync(pageIndex, pageSize,
               p => (string.IsNullOrEmpty(filterText1) || p.StatusName.Contains(filterText1)),
               o => o.OrderBy(ob => ob.Id),
               se => se);
            return data.ToPagingModel<Status, StatusModel>(_mapper);
        }

        public async Task<Paging<StatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Status>().GetPageAsync(pageIndex, pageSize,
               p => (string.IsNullOrEmpty(searchText) || p.StatusName.Contains(searchText)),
               o => o.OrderBy(ob => ob.Id),
               se => se);
            return data.ToPagingModel<Status, StatusModel>(_mapper);
        }

        public async Task<StatusModel> GetStatusDetailsAsync(long statusId)
        {
            var data = await _unitOfWork.Repository<Status>().FirstOrDefaultAsync(f => f.Id == statusId);
            return _mapper.Map<Status, StatusModel>(data);
        }

        public async Task<StatusModel> UpdateStatusDetailsAsync(long statusId, StatusModel model)
        {
            var entity = _mapper.Map<StatusModel, Status>(model);
            await _unitOfWork.Repository<Status>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new StatusModel();
        }

        public Task<StatusModel> UpdateStatusDetailsAsync(long statusId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
