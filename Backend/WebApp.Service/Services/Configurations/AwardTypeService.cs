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
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public class AwardTypeService: BaseService<AwardType>,IAwardTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AwardTypeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<AwardTypeModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<AwardType>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.AwardTypeName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new AwardTypeModel { Id = se.Id, AwardTypeName = se.AwardTypeName },
                 size
                 );
            return data;
        }
        public async Task<Paging<AwardTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<AwardType>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.AwardTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<AwardType, AwardTypeModel>(_mapper);

            return response;
        }
        public async Task<Paging<AwardTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<AwardType>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.AwardTypeName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<AwardType, AwardTypeModel>(_mapper);

            return response;
        }
        public async Task<AwardTypeModel> GetAwardTypeDetailAsync(long awardtypeId)
        {
            var data = await _unitOfWork.Repository<AwardType>().FirstOrDefaultAsync(f => f.Id == awardtypeId,
                o => o.OrderBy(ob => ob.Id)
                );


            var response = _mapper.Map<AwardType, AwardTypeModel>(data);

            return response;
        }
        public async Task<AwardTypeModel> AddAwardTypeDetailAsync(AwardTypeModel awardtype)
        {


            var entity = _mapper.Map<AwardTypeModel, AwardType>(awardtype);

            await _unitOfWork.Repository<AwardType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AwardTypeModel();
        }
        public async Task<AwardTypeModel> UpdateAwardTypeDetailAsync(long awardtypeId, AwardTypeModel awardtype)
        {
            var entity = _mapper.Map<AwardTypeModel, AwardType>(awardtype);

            await _unitOfWork.Repository<AwardType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AwardTypeModel();
        }
        public async Task<AwardTypeModel> UpdateAwardTypeDetailAsync(long awardtypeId, string model)
        {
            var awardtype = JsonConvert.DeserializeObject<AwardTypeModel>(model);
            var entity = _mapper.Map<AwardTypeModel, AwardType>(awardtype);

            await _unitOfWork.Repository<AwardType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AwardTypeModel();
        }
    }
}
