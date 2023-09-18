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
    public interface IJobNewStatusService : IBaseService<JobNewStatus>
    {
        Task<Paging<JobNewStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<JobNewStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);
        Task<JobNewStatusModel> GetJobNewStatusDetailAsync(long jobNewStatusId);
        Task<JobNewStatusModel> AddJobNewStatusDetailAsync(JobNewStatusModel model);
        Task<JobNewStatusModel> UpdateJobNewStatusDetailAsync(long jobNewStatusId, JobNewStatusModel model);
    }
}


