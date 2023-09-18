using AutoMapper;
using Microsoft.AspNetCore.Hosting;
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
    public class BankInfoService : BaseService<BankInfo>, IBankInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BankInfoService(IUnitOfWork unitOfWork, IMapper mapper, IWebHostEnvironment webHostEnvironment):base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
            this._webHostEnvironment = webHostEnvironment;
        }

        public async Task<BankInfoModel> AddBankInfoDetailAsync(BankInfoModel model)
        {
            var entity = _mapper.Map<BankInfoModel, BankInfo>(model);

            await _unitOfWork.Repository<BankInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new BankInfoModel();

        }

        public async Task<BankInfoModel> GetBankInfoDetailAsync(long bankInfoId)
        {
            var data = await _unitOfWork.Repository<BankInfo>().FirstOrDefaultAsync(f => f.Id == bankInfoId, o => o.OrderBy(ob => ob.Id),
                i => i.User);
            var response = _mapper.Map<BankInfo, BankInfoModel>(data);
            return response;
        }

        public async Task<Paging<BankInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<BankInfo>().GetPageAsync(pageIndex, pageSize,
                s=>((string.IsNullOrEmpty(filterText1) || s.AccountName.Contains(filterText1))),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se,
                i=>i.User
                );
            var response = data.ToPagingModel<BankInfo, BankInfoModel>(_mapper);
            return response;
        }

        public async Task<Paging<BankInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<BankInfo>().GetPageAsync(pageIndex, pageSize,
                s=>((string.IsNullOrEmpty(searchText) || s.AccountName.Contains(searchText)))
                || (string.IsNullOrEmpty(searchText) || s.AccountNumber.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se,
                i=>i.User);
            var response = data.ToPagingModel<BankInfo, BankInfoModel>(_mapper);
            return response;
        }

        public async Task<BankInfoModel> UpdateBankInfoDetailAsync(long bankInfoId, BankInfoModel model)
        {
            var entity = _mapper.Map<BankInfoModel, BankInfo>(model);

            await _unitOfWork.Repository<BankInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new BankInfoModel();
        }
    }
}
