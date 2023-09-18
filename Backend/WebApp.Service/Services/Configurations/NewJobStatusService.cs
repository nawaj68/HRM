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
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services.Configurations
{
    public class NewJobStatusService : BaseService<NewJobStatus>, INewJobStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public NewJobStatusService(IUnitOfWork unitOfWork,
        IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Paging<NewJobStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<NewJobStatus>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.StatusTitle.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo,
                i => i.Project,
                i => i.BranchInfo);

            var response = data.ToPagingModel<NewJobStatus, NewJobStatusModel>(_mapper);

            return response;
        }
        public async Task<Paging<NewJobStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<NewJobStatus>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.StatusTitle.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo,
                i => i.Project,
                i => i.BranchInfo);

            var response = data.ToPagingModel<NewJobStatus, NewJobStatusModel>(_mapper);

            return response;
        }
        public async Task<NewJobStatusModel> GetNewJobStatusDetailAsync(long newjobstatusId)
        {
            var data = await _unitOfWork.Repository<NewJobStatus>().FirstOrDefaultAsync(f => f.Id == newjobstatusId,
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo,
                i => i.Project,
                i => i.BranchInfo
                );


            var response = _mapper.Map<NewJobStatus, NewJobStatusModel>(data);

            return response;
        }
        public async Task<NewJobStatusModel> AddNewJobStatusDetailAsync(NewJobStatusModel newjobstatus)
        {


            var entity = _mapper.Map<NewJobStatusModel, NewJobStatus>(newjobstatus);

            await _unitOfWork.Repository<NewJobStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new NewJobStatusModel();
        }
        public async Task<NewJobStatusModel> UpdateNewJobStatusDetailAsync(long newjobstatusId, NewJobStatusModel newjobstatus)
        {
            var entity = _mapper.Map<NewJobStatusModel, NewJobStatus>(newjobstatus);

            await _unitOfWork.Repository<NewJobStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new NewJobStatusModel();
        }
        public async Task<NewJobStatusModel> UpdateNewJobStatusDetailAsync(long newjobstatusId, string model)
        {
            var newjobstatus = JsonConvert.DeserializeObject<NewJobStatusModel>(model);
            var entity = _mapper.Map<NewJobStatusModel, NewJobStatus>(newjobstatus);

            await _unitOfWork.Repository<NewJobStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new NewJobStatusModel();
        }

    }
  
}
    
