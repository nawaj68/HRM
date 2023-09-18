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
    public class OpeningYearService :BaseService<OpeningYear>,IOpeningYearService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public OpeningYearService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Paging<OpeningYearModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<OpeningYear>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Company.CompanyName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<OpeningYear, OpeningYearModel>(_mapper);

            return response;
        }
        public async Task<Paging<OpeningYearModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<OpeningYear>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Company.CompanyName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se);

            var response = data.ToPagingModel<OpeningYear, OpeningYearModel>(_mapper);

            return response;
        }
        public async Task<OpeningYearModel> GetOpeningYearDetailAsync(long openingYearId)
        {
            var data = await _unitOfWork.Repository<OpeningYear>().FirstOrDefaultAsync(f => f.Id == openingYearId,
                o => o.OrderBy(ob => ob.Id)
                );


            var response = _mapper.Map<OpeningYear, OpeningYearModel>(data);

            return response;
        }
        public async Task<OpeningYearModel> AddOpeningYearDetailAsync(OpeningYearModel openingYear)
        {


            var entity = _mapper.Map<OpeningYearModel, OpeningYear>(openingYear);

            await _unitOfWork.Repository<OpeningYear>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new OpeningYearModel();
        }
        public async Task<OpeningYearModel> UpdateOpeningYearDetailAsync(long openingYearId, OpeningYearModel openingYear)
        {
            var entity = _mapper.Map<OpeningYearModel, OpeningYear>(openingYear);

            await _unitOfWork.Repository<OpeningYear>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new OpeningYearModel();
        }
        public async Task<OpeningYearModel> UpdateOpeningYearDetailAsync(long openingYearId, string model)
        {
            var grade = JsonConvert.DeserializeObject<OpeningYearModel>(model);
            var entity = _mapper.Map<OpeningYearModel, OpeningYear>(grade);

            await _unitOfWork.Repository<OpeningYear>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new OpeningYearModel();
        }
    }
}
