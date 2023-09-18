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
    public interface ILeaveTypeService : IBaseService<LeaveType>
    {
        Task<Dropdown<LeaveTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);

        Task<Paging<LeaveTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<LeaveTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<LeaveTypeModel> AddLeaveTypeDetailsAsync(LeaveTypeModel model);
        Task<LeaveTypeModel> UpdateLeaveTypeDetailsAsync(long leaveTypeId, LeaveTypeModel model);
        Task<LeaveTypeModel> UpdateLeaveTypeDetailsAsync(long leaveTypeId, string model);
        Task<LeaveTypeModel> GetLeaveTypeDetailsAsync(long leaveTypeId);

    }



}
