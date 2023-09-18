using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public class PassportService : BaseService<Passport>, IPassportService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public PassportService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment,
              IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<PassportModel> AddPassportDetailAsync(PassportModel model)
        {
            var entity = _mapper.Map<PassportModel, Passport>(model);
            await _unitOfWork.Repository<Passport>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new PassportModel();
        }

        public async Task<Paging<PassportModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null, string filterText2 = null)
        {
            var data = await _unitOfWork.Repository<Passport>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1) || string.IsNullOrEmpty(filterText2) || s.User.UserName.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);
            var response = data.ToPagingModel<Passport, PassportModel>(_mapper);
            return response;
        }

        public async Task<Paging<PassportModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Passport>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<Passport, PassportModel>(_mapper);

            return response;
        }

        public async Task<PassportModel> GetPassportDetailAsync(long passportId)
        {
            var data = await _unitOfWork.Repository<Passport>().FirstOrDefaultAsync(f => f.Id == passportId, o => o.OrderBy(ob => ob.Id), i => i.User);
            var response = _mapper.Map<Passport, PassportModel>(data);
            return response;
        }

        public async Task<PassportModel> UpdatePassportDetailAsync(long passportId, PassportModel model)
        {
            var entity = _mapper.Map<PassportModel, Passport>(model);
            await _unitOfWork.Repository<Passport>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new PassportModel();
        }
    }
}

