using AutoMapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Enrols;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public class DesignationSetupService : BaseService<DesignationSetup>, IDesignationSetupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DesignationSetupService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<DesignationSetupModel> AddDesignationSetupDetailAsync(DesignationSetupModel model)
        {
            var entity =  _mapper.Map<DesignationSetupModel, DesignationSetup>(model);
            await _unitOfWork.Repository<DesignationSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DesignationSetupModel();
        }

        public async Task<DesignationSetupModel> GetDesignationSetupDetailAsync(long designationSetupId)
        {
            var data = await _unitOfWork.Repository<DesignationSetup>().FirstOrDefaultAsync(f=>f.Id== designationSetupId,
                p=>p.OrderBy(o=>o.Id),
                i=>i.User);

            return _mapper.Map<DesignationSetup, DesignationSetupModel>(data);
        }

        public Task<Dropdown<DesignationSetupModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            throw new NotImplementedException();
        }

        public async Task<Paging<DesignationSetupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<DesignationSetup>().GetPageAsync(pageIndex,
               pageSize,
               s => (string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1)),
               o => o.OrderBy(ob => ob.Id),
               se => se,
               i => i.User);

            var response = data.ToPagingModel<DesignationSetup, DesignationSetupModel>(_mapper);

            return response;
        }

        public async Task<Paging<DesignationSetupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<DesignationSetup>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<DesignationSetup, DesignationSetupModel>(_mapper);

            return response;
        }

        public async Task<DesignationSetupModel> UpdateDesignationSetupDetailAsync(long designationSetupId, DesignationSetupModel model)
        {
            var entity = _mapper.Map<DesignationSetupModel, DesignationSetup>(model);
            await _unitOfWork.Repository<DesignationSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new DesignationSetupModel();

        }

        public async Task<DesignationSetupModel> UpdateDesignationSetupDetailAsync(long designationSetupId, string model)
        {
            var designationSetup = JsonConvert.DeserializeObject<DesignationSetupModel>(model);
            var entity = _mapper.Map<DesignationSetupModel, DesignationSetup>(designationSetup);
            await _unitOfWork.Repository<DesignationSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new DesignationSetupModel();
        }
    }
}
