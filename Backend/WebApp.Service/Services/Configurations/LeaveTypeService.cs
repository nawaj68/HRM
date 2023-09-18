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
    public class LeaveTypeService  : BaseService<LeaveType>,ILeaveTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LeaveTypeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<LeaveTypeModel>> GetDropdownAsync(
    string searchText = null,
    int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<LeaveType>().GetDropdownAsync(
                s => ((string.IsNullOrEmpty(searchText) || s.LeaveTypeName.Contains(searchText))),
                  
                o => o.OrderBy(ob => ob.Id),
                se => new LeaveTypeModel { Id = se.Id, LeaveTypeName = se.LeaveTypeName},
                size);

            return data;
        }
        public async Task<LeaveTypeModel> AddLeaveTypeDetailsAsync(LeaveTypeModel model)
        {
            var entity = _mapper.Map<LeaveTypeModel, LeaveType>(model);

            await _unitOfWork.Repository<LeaveType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new LeaveTypeModel();
        }

        public async Task<LeaveTypeModel> GetLeaveTypeDetailsAsync(long leaveTypeId)
        {
            var data = await _unitOfWork.Repository<LeaveType>().FirstOrDefaultAsync(f => f.Id == leaveTypeId);

            var response = _mapper.Map<LeaveType, LeaveTypeModel>(data);

            return response;
        }
        public Task<Paging<LeaveTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Paging<LeaveTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<LeaveType>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(searchText) | p.LeaveTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id));

            var response = data.ToPagingModel<LeaveType, LeaveTypeModel>(_mapper);

            return response;
        }

        public async Task<LeaveTypeModel> UpdateLeaveTypeDetailsAsync(long leaveTypeId, LeaveTypeModel model)
        {
            var entity = _mapper.Map<LeaveTypeModel, LeaveType>(model);

            await _unitOfWork.Repository<LeaveType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new LeaveTypeModel();
        }

        public Task<LeaveTypeModel> UpdateLeaveTypeDetailsAsync(long leaveTypeId, string model)
        {
            throw new System.NotImplementedException();
        }
    }
}
