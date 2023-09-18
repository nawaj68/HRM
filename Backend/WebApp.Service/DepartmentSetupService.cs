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
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;
//using WebApp.Sql.Migrations;

namespace WebApp.Service
{
    public class DepartmentSetupService : BaseService<DepartmentSetup>, IDepartmentSetupService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DepartmentSetupService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DepartmentSetupModel> AddDepartmentSetupDetailAsync(DepartmentSetupModel model)
        {
            var entity = _mapper.Map<DepartmentSetupModel, DepartmentSetup>(model);

            await _unitOfWork.Repository<DepartmentSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DepartmentSetupModel();
        }

        public async Task<DepartmentSetupModel> GetDepartmentSetupDetailAsync(long departmentSetupId)
        {
            var data = await _unitOfWork.Repository<DepartmentSetup>().FirstOrDefaultAsync(f => f.Id == departmentSetupId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User);
            var response = _mapper.Map<DepartmentSetup, DepartmentSetupModel>(data);

            return response;
        }

        public Task<Dropdown<DepartmentSetupModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            throw new NotImplementedException();
        }

        public async Task<Paging<DepartmentSetupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<DepartmentSetup>().GetPageAsync(pageIndex,
               pageSize,
               s => (string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1)),
               o => o.OrderBy(ob => ob.Id),
               se => se,
               i => i.User);

            var response = data.ToPagingModel<DepartmentSetup, DepartmentSetupModel>(_mapper);

            return response;
        }

        public async Task<Paging<DepartmentSetupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<DepartmentSetup>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<DepartmentSetup, DepartmentSetupModel>(_mapper);

            return response;
        }

        public async Task<DepartmentSetupModel> UpdateDepartmentSetupDetailAsync(long departmentSetupId, DepartmentSetupModel model)
        {
            var entity = _mapper.Map<DepartmentSetupModel, DepartmentSetup>(model);

            await _unitOfWork.Repository<DepartmentSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DepartmentSetupModel();
        }

        public async Task<DepartmentSetupModel> UpdateDepartmentSetupDetailAsync(long departmentSetupId, string model)
        {
            var employees = JsonConvert.DeserializeObject<DepartmentSetupModel>(model);
            var entity = _mapper.Map<DepartmentSetupModel, DepartmentSetup>(employees);

            await _unitOfWork.Repository<DepartmentSetup>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new DepartmentSetupModel();
        }
    }
}
