using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
using WebApp.Service.Models.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IStatusService:IBaseService<Status>
    {
        Task<Dropdown<StatusModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<StatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<StatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<StatusModel> AddStatusDetailsAsync(StatusModel model);
        Task<StatusModel> UpdateStatusDetailsAsync(long statusId, StatusModel model);
        Task<StatusModel> UpdateStatusDetailsAsync(long statusId, string model);
        Task<StatusModel> GetStatusDetailsAsync(long statusId);
    }
}
