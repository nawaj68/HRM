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
    public class AssetRequisitionService : BaseService<AssetRequisition>, IAssetRequisitionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public AssetRequisitionService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment,
              IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<AssetRequisitionModel> AddAssetRequisitionDetailAsync(AssetRequisitionModel model)
        {
            var entity = _mapper.Map<AssetRequisitionModel, AssetRequisition>(model);
            await _unitOfWork.Repository<AssetRequisition>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new AssetRequisitionModel();
        }

        public async Task<Paging<AssetRequisitionModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null, string filterText2 = null)
        {
            var data = await _unitOfWork.Repository<AssetRequisition>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1) || string.IsNullOrEmpty(filterText2) || s.User.UserName.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);
            var response = data.ToPagingModel<AssetRequisition, AssetRequisitionModel>(_mapper);
            return response;
        }

        public async Task<Paging<AssetRequisitionModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<AssetRequisition>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<AssetRequisition, AssetRequisitionModel>(_mapper);

            return response;
        }

        public async Task<AssetRequisitionModel> GetAssetRequisitionDetailAsync(long assetRequisitiontId)
        {
            var data = await _unitOfWork.Repository<AssetRequisition>().FirstOrDefaultAsync(f => f.Id == assetRequisitiontId, o => o.OrderBy(ob => ob.Id), i => i.User);
            var response = _mapper.Map<AssetRequisition, AssetRequisitionModel>(data);
            return response;
        }

        public async Task<AssetRequisitionModel> UpdateAssetRequisitionDetailAsync(long assetRequisitiontId, AssetRequisitionModel model)
        {
            var entity = _mapper.Map<AssetRequisitionModel, AssetRequisition>(model);
            await _unitOfWork.Repository<AssetRequisition>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new AssetRequisitionModel();
        }
    }
}


