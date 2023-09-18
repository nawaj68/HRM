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
    public class NewApprovalWorkflowService : BaseService<NewApprovalWorkflow>,INewApprovalWorkflowService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NewApprovalWorkflowService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<NewApprovalWorkflowModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<NewApprovalWorkflow>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.NewApprovalWorkflowName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new NewApprovalWorkflowModel { Id = se.Id, NewApprovalWorkflowName = se.NewApprovalWorkflowName },
                 size
                 );
            return data;
        }
        public async Task<Paging<NewApprovalWorkflowModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<NewApprovalWorkflow>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.NewApprovalWorkflowName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<NewApprovalWorkflow, NewApprovalWorkflowModel>(_mapper);

            return response;
        }
        public async Task<Paging<NewApprovalWorkflowModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<NewApprovalWorkflow>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.NewApprovalWorkflowName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<NewApprovalWorkflow, NewApprovalWorkflowModel>(_mapper);

            return response;
        }
        public async Task<NewApprovalWorkflowModel> GetNewapprovalworkflowDetailAsync(long newApprovalWorkflowId)
        {
            var data = await _unitOfWork.Repository<NewApprovalWorkflow>().FirstOrDefaultAsync(f => f.Id == newApprovalWorkflowId,
                o => o.OrderBy(ob => ob.Id)
                );


            var response = _mapper.Map<NewApprovalWorkflow, NewApprovalWorkflowModel>(data);

            return response;
        }
        public async Task<NewApprovalWorkflowModel> AddNewapprovalworkflowDetailAsync(NewApprovalWorkflowModel newApprovalWorkflow)
        {


            var entity = _mapper.Map<NewApprovalWorkflowModel, NewApprovalWorkflow>(newApprovalWorkflow);

            await _unitOfWork.Repository<NewApprovalWorkflow>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new NewApprovalWorkflowModel();
        }
        public async Task<NewApprovalWorkflowModel> UpdateNewapprovalworkflowDetailAsync(long newApprovalWorkflowId, NewApprovalWorkflowModel newApprovalWorkflow)
        {
            var entity = _mapper.Map<NewApprovalWorkflowModel, NewApprovalWorkflow>(newApprovalWorkflow);

            await _unitOfWork.Repository<NewApprovalWorkflow>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new NewApprovalWorkflowModel();
        }
        public async Task<NewApprovalWorkflowModel> UpdateNewapprovalworkflowDetailAsync(long newApprovalWorkflowId, string model)
        {
            var newApprovalWorkflow = JsonConvert.DeserializeObject<NewApprovalWorkflowModel>(model);
            var entity = _mapper.Map<NewApprovalWorkflowModel, NewApprovalWorkflow>(newApprovalWorkflow);

            await _unitOfWork.Repository<NewApprovalWorkflow>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new NewApprovalWorkflowModel();
        }
    }
}
