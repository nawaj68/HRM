using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface ISupervisorSetupService : IBaseService<SupervisorSetup>
    {
        Task<Paging<SupervisorSetupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<SupervisorSetupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<SupervisorSetupModel> GetSupervisorSetupDetailAsync(long supervisorSetupId);
        Task<SupervisorSetupModel> AddSupervisorSetupDetailAsync(SupervisorSetupModel model);
        Task<SupervisorSetupModel> UpdateSupervisorSetupDetailAsync(long supervisorSetupId, SupervisorSetupModel model);
        //Task<Dropdown<SupervisorSetupModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
    }
}
