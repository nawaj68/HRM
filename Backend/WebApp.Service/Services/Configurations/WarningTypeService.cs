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
    public class WarningTypeService : BaseService<WarningType>,IWarningTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public WarningTypeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<WarningTypeModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<WarningType>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.WarningTypeName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new WarningTypeModel { Id = se.Id, WarningTypeName = se.WarningTypeName },
                 size
                 );
            return data;
        }
        public async Task<Paging<WarningTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<WarningType>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.WarningTypeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<WarningType, WarningTypeModel>(_mapper);

            return response;
        }
        public async Task<Paging<WarningTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<WarningType>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.WarningTypeName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<WarningType, WarningTypeModel>(_mapper);

            return response;
        }
        public async Task<WarningTypeModel> GetWarningTypeDetailAsync(long warningtypeId)
        {
            var data = await _unitOfWork.Repository<WarningType>().FirstOrDefaultAsync(f => f.Id == warningtypeId,
                o => o.OrderBy(ob => ob.Id)
                );


            var response = _mapper.Map<WarningType, WarningTypeModel>(data);

            return response;
        }
        public async Task<WarningTypeModel> AddWarningTypeDetailAsync(WarningTypeModel warningtype)
        {


            var entity = _mapper.Map<WarningTypeModel, WarningType>(warningtype);

            await _unitOfWork.Repository<WarningType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new WarningTypeModel();
        }
        public async Task<WarningTypeModel> UpdateWarningTypeDetailAsync(long warningtypeId, WarningTypeModel warningtype)
        {
            var entity = _mapper.Map<WarningTypeModel, WarningType>(warningtype);

            await _unitOfWork.Repository<WarningType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new WarningTypeModel();
        }
        public async Task<WarningTypeModel> UpdateWarningTypeDetailAsync(long warningtypeId, string model)
        {
            var warningtype = JsonConvert.DeserializeObject<WarningTypeModel>(model);
            var entity = _mapper.Map<WarningTypeModel, WarningType>(warningtype);

            await _unitOfWork.Repository<WarningType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new WarningTypeModel();
        }
    }
}
