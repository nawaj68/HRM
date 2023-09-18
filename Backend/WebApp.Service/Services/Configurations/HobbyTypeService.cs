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
    public class HobbyTypeService : BaseService<HobbyType>, IHobbyTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public HobbyTypeService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<HobbyTypeModel> AddHobbyTypeDetailsAsync(HobbyTypeModel model)
        {
            var entity = _mapper.Map<HobbyTypeModel, HobbyType>(model);
            await _unitOfWork.Repository<HobbyType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new HobbyTypeModel();
        }

        public async Task<Dropdown<HobbyTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<HobbyType>().GetDropdownAsync(
                p=>(string.IsNullOrEmpty(searchText)||p.HobbyTypeName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=> new HobbyTypeModel { Id=se.Id, HobbyTypeName=se.HobbyTypeName },
                size);
            return data;
        }

        public async Task<Paging<HobbyTypeModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<HobbyType>().GetPageAsync(pageIndex, pageSize,
                s => (string.IsNullOrEmpty(filterText1) || s.HobbyTypeName.Contains(filterText1)),
                o => o.OrderBy(ob => ob.Id),
                se => se);
            var response = data.ToPagingModel<HobbyType, HobbyTypeModel>(_mapper);
            return response;
        }

        public async Task<HobbyTypeModel> GetHobbyTypeDetailsAsync(long hobbyTypeId)
        {
            var data = await _unitOfWork.Repository<HobbyType>().FirstOrDefaultAsync(f => f.Id == hobbyTypeId, o => o.OrderBy(ob => ob.Id)
                );
            var response = _mapper.Map<HobbyType, HobbyTypeModel>(data);
            return response;
        }

        public async Task<Paging<HobbyTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<HobbyType>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(searchText) || s.HobbyTypeName.Contains(searchText)))
                || (string.IsNullOrEmpty(searchText) || s.HobbyTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);
            var response = data.ToPagingModel<HobbyType, HobbyTypeModel>(_mapper);
            return response;
        }

        public async Task<HobbyTypeModel> UpdateHobbyTypeDetailsAsync(long hobbyTypeId, HobbyTypeModel model)
        {
            var entity = _mapper.Map<HobbyTypeModel, HobbyType>(model);

            await _unitOfWork.Repository<HobbyType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new HobbyTypeModel();
        }

    }
}
