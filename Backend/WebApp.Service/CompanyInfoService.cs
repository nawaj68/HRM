using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
    public class CompanyInfoService : BaseService<CompanyInfo>, ICompanyInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CompanyInfoService(IUnitOfWork unitOfWork,
      IMapper mapper,
      IWebHostEnvironment webHostEnvironment,
      IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<Dropdown<CompanyInfoModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<CompanyInfo>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.CompanyName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new CompanyInfoModel { Id = se.Id, CompanyName = se.CompanyName },
                 size
                 );
            return data;
        }
        public async Task<Paging<CompanyInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<CompanyInfo>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.CompanyName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<CompanyInfo, CompanyInfoModel>(_mapper);

            return response;
        }
        public async Task<Paging<CompanyInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<CompanyInfo>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.CompanyName.Contains(filterText1))),

                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<CompanyInfo, CompanyInfoModel>(_mapper);

            return response;
        }
        public async Task<CompanyInfoModel> GetCompanyInfoDetailAsync(long companyInfoId)
        {
            var data = await _unitOfWork.Repository<CompanyInfo>().FirstOrDefaultAsync(f => f.Id == companyInfoId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User);


            var response = _mapper.Map<CompanyInfo, CompanyInfoModel>(data);

            return response;
        }
        public async Task<CompanyInfoModel> AddCompanyInfoDetailAsync(CompanyInfoModel companyInfo)
        {
            string uniqueFileName = string.Empty;

            var entity = _mapper.Map<CompanyInfoModel, CompanyInfo>(companyInfo);

            await _unitOfWork.Repository<CompanyInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CompanyInfoModel();
        }
        public async Task<CompanyInfoModel> UpdateCompanyInfoDetailAsync(long companyInfoId, CompanyInfoModel company)
        {
            var entity = _mapper.Map<CompanyInfoModel, CompanyInfo>(company);

            await _unitOfWork.Repository<CompanyInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CompanyInfoModel();
        }
        public async Task<CompanyInfoModel> UpdateCompanyInfoDetailAsync(long companyInfoId, string model)
        {
            var company = JsonConvert.DeserializeObject<CompanyInfoModel>(model);
            var entity = _mapper.Map<CompanyInfoModel, CompanyInfo>(company);

            await _unitOfWork.Repository<CompanyInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new CompanyInfoModel();
        }
    }
}
