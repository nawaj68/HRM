using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface ISupervisorService:IBaseService<Supervisor>
    {
        Task<Paging<SupervisorModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<SupervisorModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);
        Task<SupervisorModel> GetSupervisorDetailAsync(long supervisorId);
        Task<SupervisorModel> AddSupervisorDetailAsync(SupervisorModel model);
        Task<SupervisorModel> UpdateSupervisorDetailAsync(long supervisorId,SupervisorModel model);
    }
}
