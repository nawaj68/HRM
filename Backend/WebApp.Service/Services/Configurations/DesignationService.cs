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
    public class DesignationService : BaseService<Designation>, IDesignationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public DesignationService(IUnitOfWork unitOfWork,
              IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DesignationModel> AddDesignationDetailsAsync(DesignationModel model)
        {
            var entity = _mapper.Map<DesignationModel, Designation>(model);
            await _unitOfWork.Repository<Designation>().InsertAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new DesignationModel();
        }

        public async Task<DesignationModel> GetDesignationDetailsAsync(long designationId)
        {
            var data = await _unitOfWork.Repository<Designation>().FirstOrDefaultAsync(f=>f.Id== designationId);
            return _mapper.Map<Designation, DesignationModel>(data);
        }

        public async Task<Dropdown<DesignationModel>> GetDropdownAsync(string searchText = null,
          int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Designation>().GetDropdownAsync(
                p => (string.IsNullOrEmpty(searchText) || p.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => new DesignationModel { Id = se.Id, Name = se.Name },
                size);

            return data;
        }

        public async Task<Paging<DesignationModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Designation>().GetPageAsync(pageIndex, pageSize,
               p => (string.IsNullOrEmpty(filterText1) | p.Name.Contains(filterText1)),
               o => o.OrderBy(ob => ob.Id),
               se => se);
            return data.ToPagingModel<Designation, DesignationModel>(_mapper);
        }

        public async Task<Paging<DesignationModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Designation>().GetPageAsync(pageIndex, pageSize,
               p => (string.IsNullOrEmpty(searchText) | p.Name.Contains(searchText)),
               o => o.OrderBy(ob => ob.Id),
               se => se);
            return data.ToPagingModel<Designation, DesignationModel>(_mapper);
        }

        public async Task<DesignationModel> UpdateDesignationDetailsAsync(long designationId, DesignationModel model)
        {
            var entity = _mapper.Map<DesignationModel,Designation>(model);
            await _unitOfWork.Repository<Designation>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new DesignationModel();
        }

        public Task<DesignationModel> UpdateDesignationDetailsAsync(long designationId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
