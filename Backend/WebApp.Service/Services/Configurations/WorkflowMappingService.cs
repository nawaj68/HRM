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
     public class WorkflowMappingService :BaseService<WorkflowMaping>, IWorkflowMappingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WorkflowMappingService(IUnitOfWork unitOfWork,
        IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Paging<WorkflowMappingModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<WorkflowMaping>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText))) ||
                ((string.IsNullOrEmpty(searchText) || s.Company.CompanyName.Contains(searchText))) ||
                ((string.IsNullOrEmpty(searchText) || s.Branch.BranchName.Contains(searchText)))||
                ((string.IsNullOrEmpty(searchText) || s.Department.Name.Contains(searchText))),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<WorkflowMaping, WorkflowMappingModel>(_mapper);

            return response;
        }
        public async Task<Paging<WorkflowMappingModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null, string filterText3 = null, string filterText4 = null)
        {
            var data = await _unitOfWork.Repository<WorkflowMaping>().GetPageAsync(pageIndex,
                pageSize,
                    s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1))
                    || (string.IsNullOrEmpty(filterText2) || s.Company.CompanyName.Contains(filterText2))
                    || (string.IsNullOrEmpty(filterText3) || s.Branch.BranchName.Contains(filterText3))
                    || (string.IsNullOrEmpty(filterText4) || s.Department.Name.Contains(filterText4))),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<WorkflowMaping, WorkflowMappingModel>(_mapper);

            return response;
        }
        public async Task<WorkflowMappingModel> GetWorkflowMappingDetailAsync(long workflowMapingId)
        {
            var data = await _unitOfWork.Repository<WorkflowMaping>().FirstOrDefaultAsync(f => f.Id == workflowMapingId,
                o => o.OrderBy(ob => ob.Id)
                );


            var response = _mapper.Map<WorkflowMaping, WorkflowMappingModel>(data);

            return response;
        }
        public async Task<WorkflowMappingModel> AddWorkflowMappingDetailAsync(WorkflowMappingModel workflowMaping)
        {


            var entity = _mapper.Map<WorkflowMappingModel, WorkflowMaping>(workflowMaping);

            await _unitOfWork.Repository<WorkflowMaping>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new WorkflowMappingModel();
        }
        public async Task<WorkflowMappingModel> UpdateWorkflowMappingDetailAsync(long workflowMapingId, WorkflowMappingModel workflowMaping)
        {
            var entity = _mapper.Map<WorkflowMappingModel, WorkflowMaping>(workflowMaping);

            await _unitOfWork.Repository<WorkflowMaping>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new WorkflowMappingModel();
        }
        public async Task<WorkflowMappingModel> UpdateWorkflowMappingDetailAsync(long workflowMapingId, string model)
        {
            var grade = JsonConvert.DeserializeObject<WorkflowMappingModel>(model);
            var entity = _mapper.Map<WorkflowMappingModel, WorkflowMaping>(grade);

            await _unitOfWork.Repository<WorkflowMaping>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new WorkflowMappingModel();
        }

    }
}
