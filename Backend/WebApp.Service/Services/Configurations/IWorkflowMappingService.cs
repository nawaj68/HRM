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
    public interface IWorkflowMappingService : IBaseService<WorkflowMaping>
    {
        Task<Paging<WorkflowMappingModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<WorkflowMappingModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null, string filterText3 = null, string filterText4 = null);
        Task<WorkflowMappingModel> GetWorkflowMappingDetailAsync(long workflowMappingId);
        Task<WorkflowMappingModel> AddWorkflowMappingDetailAsync(WorkflowMappingModel model);
        Task<WorkflowMappingModel> UpdateWorkflowMappingDetailAsync(long workflowMappingId, WorkflowMappingModel model);
        Task<WorkflowMappingModel> UpdateWorkflowMappingDetailAsync(long workflowMappingId, string model);
    }
}
