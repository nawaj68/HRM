using AutoMapper;
using System.Drawing;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public class CountryService : BaseService<Country>, ICountryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CountryService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CountryModel> AddCountryDetailsAsync(CountryModel model)
        {
            var entity = _mapper.Map<CountryModel, Country>(model);

            await _unitOfWork.Repository<Country>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CountryModel();
        }

        public async Task<CountryModel> GetCountryDetailsAsync(long countryId)
        {
            var data = await _unitOfWork.Repository<Country>().FirstOrDefaultAsync(f => f.Id == countryId);

            var response = _mapper.Map<Country, CountryModel>(data);

            return response;
        }

        public async Task<Dropdown<CountryModel>> GetDropdownAsync(string searchText = null,
            int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Country>().GetDropdownAsync(
                p => (string.IsNullOrEmpty(searchText) || p.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => new CountryModel { Id = se.Id, Name = se.Name, Code = se.Code, Currency = se.Currency, Flag = se.Flag },
                size);

            return data;
        }

        public Task<Paging<CountryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Paging<CountryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Country>().GetPageAsync(pageIndex,pageSize,
                p=>(string.IsNullOrEmpty(searchText)|p.Name.Contains(searchText)|p.Code.Contains(searchText) | p.Currency.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id));

            var response = data.ToPagingModel<Country, CountryModel>(_mapper);

            return response;
        }

        public async Task<CountryModel> UpdateCountryDetailsAsync(long countryId, CountryModel model)
        {
            var entity = _mapper.Map<CountryModel, Country>(model);

            await _unitOfWork.Repository<Country>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CountryModel();
        }

        public Task<CountryModel> UpdateCountryDetailsAsync(long countryId, string model)
        {
            throw new System.NotImplementedException();
        }
    }
}
