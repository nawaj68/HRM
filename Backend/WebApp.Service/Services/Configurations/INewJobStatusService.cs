using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services.Configurations
{
    public interface INewJobStatusService : IBaseService<NewJobStatus>
    {
        Task<Paging<NewJobStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<NewJobStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<NewJobStatusModel> GetNewJobStatusDetailAsync(long newjobstatusId);
        Task<NewJobStatusModel> AddNewJobStatusDetailAsync(NewJobStatusModel model);
        Task<NewJobStatusModel> UpdateNewJobStatusDetailAsync(long newjobstatusId, NewJobStatusModel model);
        Task<NewJobStatusModel> UpdateNewJobStatusDetailAsync(long newjobstatusId, string model);
    }
}
