using AutoMapper;
using Newtonsoft.Json;
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
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services.Configurations
{
    public class JobBaseStatusService : BaseService<JobBaseStatus>, IJobBaseStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public JobBaseStatusService(IUnitOfWork unitOfWork,
        IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Paging<JobBaseStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<JobBaseStatus>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.JobBaseStatusTitle.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.Project,
                i => i.CompanyInfo,
                i => i.BranchInfo);

            var response = data.ToPagingModel<JobBaseStatus, JobBaseStatusModel>(_mapper);

            return response;
        }
        public async Task<Paging<JobBaseStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<JobBaseStatus>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.JobBaseStatusTitle.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.Project,
                i => i.CompanyInfo,
                i => i.BranchInfo);

            var response = data.ToPagingModel<JobBaseStatus, JobBaseStatusModel>(_mapper);

            return response;
        }
        public async Task<JobBaseStatusModel> GetJobBaseStatusDetailAsync(long jobbasestatusId)
        {
            var data = await _unitOfWork.Repository<JobBaseStatus>().FirstOrDefaultAsync(f => f.Id == jobbasestatusId,
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.Project,
                i => i.CompanyInfo,
                i => i.BranchInfo
                );


            var response = _mapper.Map<JobBaseStatus, JobBaseStatusModel>(data);

            return response;
        }
        public async Task<JobBaseStatusModel> AddJobBaseStatusDetailAsync(JobBaseStatusModel jobbasestatus)
        {


            var entity = _mapper.Map<JobBaseStatusModel, JobBaseStatus>(jobbasestatus);

            await _unitOfWork.Repository<JobBaseStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new JobBaseStatusModel();
        }
        public async Task<JobBaseStatusModel> UpdateJobBaseStatusDetailAsync(long jobbasestatusId, JobBaseStatusModel jobbasestatus)
        {
            var entity = _mapper.Map<JobBaseStatusModel, JobBaseStatus>(jobbasestatus);

            await _unitOfWork.Repository<JobBaseStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new JobBaseStatusModel();
        }
        public async Task<JobBaseStatusModel> UpdateJobBaseStatusDetailAsync(long jobbasestatusId, string model)
        {
            var jobbasestatus = JsonConvert.DeserializeObject<JobBaseStatusModel>(model);
            var entity = _mapper.Map<JobBaseStatusModel, JobBaseStatus>(jobbasestatus);

            await _unitOfWork.Repository<JobBaseStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new JobBaseStatusModel();
        }

    }
}
