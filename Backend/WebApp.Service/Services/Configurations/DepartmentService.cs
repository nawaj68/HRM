using AutoMapper;
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

namespace WebApp.Service.Services.Configurations
{
    public class DepartmentService : BaseService<Department>, IDepartmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DepartmentService(IUnitOfWork unitOfWork,
              IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DepartmentModel> AddDepartmentDetailsAsync(DepartmentModel model)
        {
            var entity = _mapper.Map<DepartmentModel, Department>(model);
            await _unitOfWork.Repository<Department>().InsertAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new DepartmentModel();
        }

        public async Task<DepartmentModel> GetDepartmentDetailsAsync(long departmentId)
        {
            var data = await _unitOfWork.Repository<Department>().FirstOrDefaultAsync(f=>f.Id== departmentId);
            return _mapper.Map<Department, DepartmentModel>(data);
        }

        public async Task<Dropdown<DepartmentModel>> GetDropdownAsync(long? designationId = null,
         string searchText = null,
         int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Department>().GetDropdownAsync(
                p => ((string.IsNullOrEmpty(searchText) || p.Name.Contains(searchText))
                        && designationId == null || p.DesignationId == designationId),
                o => o.OrderBy(ob => ob.Id),
                se => new DepartmentModel { Id = se.Id, Name = se.Name, DesignationId = se.DesignationId },
                size);

            return data;
        }

        public async Task<Paging<DepartmentModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Department>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(filterText1) | p.Name.Contains(filterText1)),
                o => o.OrderBy(ob => ob.Id),
                se => se);
            return data.ToPagingModel<Department, DepartmentModel>(_mapper);
        }

        public async Task<Paging<DepartmentModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Department>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(searchText) | p.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);
            return data.ToPagingModel<Department, DepartmentModel>(_mapper);
        }

        public async Task<DepartmentModel> UpdateDepartmentDetailsAsync(long departmentId, DepartmentModel model)
        {
            var entity = _mapper.Map<DepartmentModel, Department>(model);
            await _unitOfWork.Repository<Department>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new DepartmentModel();
        }

        public Task<DepartmentModel> UpdateDepartmentDetailsAsync(long departmentId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
