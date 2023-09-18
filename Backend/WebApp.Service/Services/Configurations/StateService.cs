using AutoMapper;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public class StateService : BaseService<State>, IStateService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public StateService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<StateModel> AddCountryDetailsAsync(StateModel model)
        {
            var entity = _mapper.Map<StateModel, State>(model);

            await _unitOfWork.Repository<State>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new StateModel();
        }

        public async Task<StateModel> GetCountryDetailsAsync(long stateId)
        {
            var data = await _unitOfWork.Repository<State>().FirstOrDefaultAsync(f => f.Id == stateId);

            var response = _mapper.Map<State, StateModel>(data);

            return response;
        }

        public async Task<Dropdown<StateModel>> GetDropdownAsync(long? countryId = null,
            string searchText = null,
            int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<State>().GetDropdownAsync(
                p => ((string.IsNullOrEmpty(searchText) || p.Name.Contains(searchText))
                        && countryId == null || p.CountryId == countryId),
                o => o.OrderBy(ob => ob.Id),
                se => new StateModel { Id = se.Id, Name = se.Name, CountryId = se.CountryId },
                size);

            return data;
        }

        public Task<Paging<StateModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Paging<StateModel>> GetSearchAsync(int pageIndex = 0, int pageSize = 10, string searchText = null)
        {
            var data = await _unitOfWork.Repository<State>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(searchText) | p.Name.Contains(searchText)));

            var response = data.ToPagingModel<State, StateModel>(_mapper);

            return response;
        }

        public async Task<StateModel> UpdateCountryDetailsAsync(long stateId, StateModel model)
        {
            var entity = _mapper.Map<StateModel, State>(model);

            await _unitOfWork.Repository<State>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new StateModel();
        }

        public Task<StateModel> UpdateCountryDetailsAsync(long stateId, string model)
        {
            throw new System.NotImplementedException();
        }
    }
}
