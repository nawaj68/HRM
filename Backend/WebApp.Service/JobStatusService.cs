using AutoMapper;
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
    public class JobStatusService : BaseService<JobStatus>, IJobStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public JobStatusService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<JobStatusModel> AddJobStatusDetailAsync(JobStatusModel model)
        {
            var entity = _mapper.Map<JobStatusModel, JobStatus>(model);
            await _unitOfWork.Repository<JobStatus>().InsertAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new JobStatusModel();
        }

        public Task<Dropdown<JobStatusModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            throw new NotImplementedException();
        }

        public async Task<Paging<JobStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<JobStatus>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(filterText1) | p.Employees.Name.Contains(filterText1)),
                o => o.OrderBy(f => f.Id),
                se => se);
            return data.ToPagingModel<JobStatus, JobStatusModel>(_mapper);
        }

        public async Task<JobStatusModel> GetJobStatusDetailAsync(long jobStatusId)
        {
            var data = await _unitOfWork.Repository<JobStatus>().FirstOrDefaultAsync(f=>f.Id == jobStatusId);
            return _mapper.Map<JobStatus, JobStatusModel>(data);
        }

        public async Task<Paging<JobStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<JobStatus>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(searchText) | p.Employees.Name.Contains(searchText)),
                o => o.OrderBy(f => f.Id),
                se => se);
            return data.ToPagingModel<JobStatus, JobStatusModel>(_mapper);
        }

        public async Task<JobStatusModel> UpdateJobStatusDetailAsync(long jobStatusId, JobStatusModel model)
        {
            var entity = _mapper.Map<JobStatusModel, JobStatus>(model);
            await _unitOfWork.Repository<JobStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new JobStatusModel();
        }

        public Task<JobStatusModel> UpdateJobStatusDetailAsync(long jobStatusId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
