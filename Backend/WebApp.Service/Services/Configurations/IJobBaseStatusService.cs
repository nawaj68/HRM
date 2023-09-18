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
    public interface IJobBaseStatusService : IBaseService<JobBaseStatus>
    {
        Task<Paging<JobBaseStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<JobBaseStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<JobBaseStatusModel> GetJobBaseStatusDetailAsync(long jobbasestatusId);
        Task<JobBaseStatusModel> AddJobBaseStatusDetailAsync(JobBaseStatusModel model);
        Task<JobBaseStatusModel> UpdateJobBaseStatusDetailAsync(long jobbasestatusId, JobBaseStatusModel model);
        Task<JobBaseStatusModel> UpdateJobBaseStatusDetailAsync(long jobbasestatusId, string model);
    }
}
