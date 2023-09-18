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
    public interface INewApprovalWorkflowService : IBaseService<NewApprovalWorkflow>
    {
        Task<Dropdown<NewApprovalWorkflowModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<NewApprovalWorkflowModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<NewApprovalWorkflowModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<NewApprovalWorkflowModel> GetNewapprovalworkflowDetailAsync(long newapprovalworkflowId);
        Task<NewApprovalWorkflowModel> AddNewapprovalworkflowDetailAsync(NewApprovalWorkflowModel model);
        Task<NewApprovalWorkflowModel> UpdateNewapprovalworkflowDetailAsync(long newapprovalworkflowId, NewApprovalWorkflowModel model);
        Task<NewApprovalWorkflowModel> UpdateNewapprovalworkflowDetailAsync(long newapprovalworkflowId, string model);
    }
}
