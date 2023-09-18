using AutoMapper;
using System;
using System.Collections.Generic;
using System.Drawing;
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
    public class ReligionService : BaseService<Religion>, IReligionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReligionService(IUnitOfWork unitOfWork,IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ReligionModel> AddReligionDetailsAsync(ReligionModel model)
        {
            var entity = _mapper.Map<ReligionModel, Religion>(model);
            await _unitOfWork.Repository<Religion>().InsertAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new ReligionModel();
        }

        public async Task<Dropdown<ReligionModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Religion>().GetDropdownAsync(
                p => (string.IsNullOrEmpty(searchText) || p.ReligionName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => new ReligionModel { Id = se.Id, ReligionName = se.ReligionName },
                size);
            return data;
        }

        public async Task<Paging<ReligionModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Religion>().GetPageAsync(pageIndex,pageSize,
                p => (string.IsNullOrEmpty(filterText1) || p.ReligionName.Contains(filterText1)),
                o => o.OrderBy(ob => ob.Id),
                se => se);
            return data.ToPagingModel<Religion, ReligionModel>(_mapper);
        }

        public async Task<ReligionModel> GetReligionDetailsAsync(long religionId)
        {
            var data = await _unitOfWork.Repository<Religion>().FirstOrDefaultAsync(f=>f.Id== religionId);
            return _mapper.Map<Religion, ReligionModel>(data);
        }

        public async Task<Paging<ReligionModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Religion>().GetPageAsync(pageIndex, pageSize,
               p => (string.IsNullOrEmpty(searchText) || p.ReligionName.Contains(searchText)),
               o => o.OrderBy(ob => ob.Id),
               se => se);
            return data.ToPagingModel<Religion, ReligionModel>(_mapper);
        }

        public async Task<ReligionModel> UpdateReligionDetailsAsync(long religionId, ReligionModel model)
        {
            var entity = _mapper.Map<ReligionModel, Religion>(model);
            await _unitOfWork.Repository<Religion>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new ReligionModel();
        }

        public Task<ReligionModel> UpdateReligionDetailsAsync(long religionId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
