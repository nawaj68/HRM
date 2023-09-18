using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
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
    public class JobNewStatusService : BaseService<JobNewStatus>, IJobNewStatusService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public JobNewStatusService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment,
              IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<JobNewStatusModel> AddJobNewStatusDetailAsync(JobNewStatusModel model)
        {
            var entity = _mapper.Map<JobNewStatusModel, JobNewStatus>(model);
            await _unitOfWork.Repository<JobNewStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new JobNewStatusModel();
        }

        public async Task<Paging<JobNewStatusModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null, string filterText2 = null)
        {
            var data = await _unitOfWork.Repository<JobNewStatus>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1) || string.IsNullOrEmpty(filterText2) || s.User.UserName.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);
            var response = data.ToPagingModel<JobNewStatus, JobNewStatusModel>(_mapper);
            return response;
        }

        public async Task<Paging<JobNewStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<JobNewStatus>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<JobNewStatus, JobNewStatusModel>(_mapper);

            return response;
        }

        public async Task<JobNewStatusModel> GetJobNewStatusDetailAsync(long jobNewStatusId)
        {
            var data = await _unitOfWork.Repository<JobNewStatus>().FirstOrDefaultAsync(f => f.Id == jobNewStatusId, o => o.OrderBy(ob => ob.Id), i => i.User);
            var response = _mapper.Map<JobNewStatus, JobNewStatusModel>(data);
            return response;
        }

        public async Task<JobNewStatusModel> UpdateJobNewStatusDetailAsync(long jobNewStatusId, JobNewStatusModel model)
        {
            var entity = _mapper.Map<JobNewStatusModel, JobNewStatus>(model);
            await _unitOfWork.Repository<JobNewStatus>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new JobNewStatusModel();
        }
    }
}


