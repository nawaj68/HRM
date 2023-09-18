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
    public class BranchInfoService : BaseService<BranchInfo>,IBranchInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BranchInfoService(IUnitOfWork unitOfWork,
      IMapper mapper,
      IWebHostEnvironment webHostEnvironment,
      IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Dropdown<BranchInfoModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<BranchInfo>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.BranchName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new BranchInfoModel { Id = se.Id, BranchName = se.BranchName },
                 size
                 );
            return data;
        }
        public async Task<Paging<BranchInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<BranchInfo>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.BranchName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<BranchInfo, BranchInfoModel>(_mapper);

            return response;
        }

        public async Task<Paging<BranchInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<BranchInfo>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.BranchName.Contains(filterText1))),

                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<BranchInfo, BranchInfoModel>(_mapper);

            return response;
        }
        public async Task<BranchInfoModel> GetBranchInfoDetailAsync(long branchInfoId)
        {
            var data = await _unitOfWork.Repository<BranchInfo>().FirstOrDefaultAsync(f => f.Id == branchInfoId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User);


            var response = _mapper.Map<BranchInfo, BranchInfoModel>(data);

            return response;
        }
        public async Task<BranchInfoModel> AddBranchInfoDetailAsync(BranchInfoModel branchInfo)
        {
            

            var entity = _mapper.Map<BranchInfoModel, BranchInfo>(branchInfo);

            await _unitOfWork.Repository<BranchInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new BranchInfoModel();
        }
        public async Task<BranchInfoModel> UpdateBranchInfoDetailAsync(long branchInfoId, BranchInfoModel branch)
        {
            var entity = _mapper.Map<BranchInfoModel, BranchInfo>(branch);

            await _unitOfWork.Repository<BranchInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new BranchInfoModel();
        }
        public async Task<BranchInfoModel> UpdateBranchInfoDetailAsync(long branchInfoId, string model)
        {
            var branch = JsonConvert.DeserializeObject<BranchInfoModel>(model);
            var entity = _mapper.Map<BranchInfoModel, BranchInfo>(branch);

            await _unitOfWork.Repository<BranchInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new BranchInfoModel();
        }
    }
}
