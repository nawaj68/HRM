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
//using WebApp.Sql.Entities.Enrols;
//using WebApp.Sql.Migrations;

namespace WebApp.Service
{
    public class SupervisorService : BaseService<Supervisor>, ISupervisorService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public SupervisorService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment
              ) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<SupervisorModel> AddSupervisorDetailAsync(SupervisorModel model)
        {
            var entity = _mapper.Map<SupervisorModel, Supervisor>(model);
            await _unitOfWork.Repository<Supervisor>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new SupervisorModel();
        }

        public async Task<Paging<SupervisorModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null)
        {
            var data = await _unitOfWork.Repository<Supervisor>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1) || string.IsNullOrEmpty(filterText2) || s.User.UserName.Contains(filterText2))),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se,
                i=>i.User);
            var response = data.ToPagingModel<Supervisor, SupervisorModel>(_mapper);
            return response; 
        }

        public async Task<Paging<SupervisorModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Supervisor>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<Supervisor, SupervisorModel>(_mapper);

            return response;
        }

        public async Task<SupervisorModel> GetSupervisorDetailAsync(long supervisorId)
        {
            var data = await _unitOfWork.Repository<Supervisor>().FirstOrDefaultAsync(f => f.Id == supervisorId, o => o.OrderBy(ob => ob.Id), i => i.User);
            var response = _mapper.Map<Supervisor, SupervisorModel>(data);
            return response;
        }

        public async Task<SupervisorModel> UpdateSupervisorDetailAsync(long supervisorId, SupervisorModel model)
        {
            var entity = _mapper.Map<SupervisorModel, Supervisor>(model);
            await _unitOfWork.Repository<Supervisor>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new SupervisorModel();
        }
    }
}
