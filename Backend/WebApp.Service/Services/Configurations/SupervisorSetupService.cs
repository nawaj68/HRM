using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services.Configurations
{
    public class SupervisorSetupService : BaseService<SupervisorSetup>,ISupervisorSetupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public SupervisorSetupService(IUnitOfWork unitOfWork,
        IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<SupervisorSetupModel> AddSupervisorSetupDetailAsync(SupervisorSetupModel model)
        {
            var entity = _mapper.Map<SupervisorSetupModel, SupervisorSetup>(model);
            await _unitOfWork.Repository<SupervisorSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new SupervisorSetupModel();
        }

        //public Task<Dropdown<SupervisorSetupModel>> GetDropdownAsync(string searchText = null, int size = 15)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<Paging<SupervisorSetupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<SupervisorSetup>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Company.CompanyName.Contains(filterText1))),
                o => o.OrderBy(ob => ob.Id),
                se=>se
                );
            var response = data.ToPagingModel<SupervisorSetup, SupervisorSetupModel>(_mapper);
            return response;
        }

        public async Task<Paging<SupervisorSetupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<SupervisorSetup>().GetPageAsync(pageIndex, pageSize,
                s=>(string.IsNullOrEmpty(searchText)||s.Company.CompanyName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se
                );
            var res = data.ToPagingModel<SupervisorSetup, SupervisorSetupModel>(_mapper);
            return res;
        }

        public async Task<SupervisorSetupModel> GetSupervisorSetupDetailAsync(long supervisorSetupId)
        {
            var data = await _unitOfWork.Repository<SupervisorSetup>().FirstOrDefaultAsync(f => f.Id == supervisorSetupId,
                o=>o.OrderBy(ob=>ob.Id),
                i=>i.Employees);
            return _mapper.Map<SupervisorSetup, SupervisorSetupModel>(data);
        }

        public async Task<SupervisorSetupModel> UpdateSupervisorSetupDetailAsync(long supervisorSetupId, SupervisorSetupModel model)
        {
            var entity = _mapper.Map<SupervisorSetupModel, SupervisorSetup>(model);
            await _unitOfWork.Repository<SupervisorSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new SupervisorSetupModel();
        }
    }
}
