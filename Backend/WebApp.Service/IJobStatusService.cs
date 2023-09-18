using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IJobStatusService:IBaseService<JobStatus>
    {
        Task<Dropdown<JobStatusModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<JobStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<JobStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<JobStatusModel> GetJobStatusDetailAsync(long jobStatusId);
        Task<JobStatusModel> AddJobStatusDetailAsync(JobStatusModel model);
        Task<JobStatusModel> UpdateJobStatusDetailAsync(long jobStatusId, JobStatusModel model);
        Task<JobStatusModel> UpdateJobStatusDetailAsync(long jobStatusId, string model);
    }
}
