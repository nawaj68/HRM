using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public class CityService : BaseService<City>, ICityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CityService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CityModel> AddCityDetailsAsync(CityModel model)
        {
            var entity = _mapper.Map<CityModel, City>(model);
            await _unitOfWork.Repository<City>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CityModel();

        }

        public async Task<CityModel> GetCityDetailsAsync(long cityId)
        {
            var data = await _unitOfWork.Repository<City>().FirstOrDefaultAsync(f => f.Id == cityId);
            var response = _mapper.Map<City, CityModel>(data);
            return response;
        }

        public async Task<Dropdown<CityModel>> GetDropdownAsync(long? stateId = null,
            string searchText = null,
            int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<City>().GetDropdownAsync(
                s => ((string.IsNullOrEmpty(searchText) || s.Name.Contains(searchText))
                    && stateId == null || s.StateId == stateId),
                o => o.OrderBy(ob => ob.Id),
                se => new CityModel { Id = se.Id, Name = se.Name, StateId = se.StateId },
                size);

            return data;
        }

        public Task<Paging<CityModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Paging<CityModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<City>().GetPageAsync(pageIndex, pageSize,
                p=>(string.IsNullOrEmpty(searchText)|p.Name.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id));
            var response = data.ToPagingModel<City, CityModel>(_mapper);
            return response;
        }

        public async Task<CityModel> UpdateCityDetailsAsync(long cityId, CityModel model)
        {
            var entity = _mapper.Map<CityModel, City>(model);

            await _unitOfWork.Repository<City>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CityModel();
        }

        public Task<CityModel> UpdateCityDetailsAsync(long cityId, string model)
        {
            throw new System.NotImplementedException();
        }
    }
}
