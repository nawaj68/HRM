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
    public class AssetService : BaseService<Asset>, IAssetService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AssetService(IUnitOfWork unitOfWork,
      IMapper mapper,
      IWebHostEnvironment webHostEnvironment,
      IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Paging<AssetModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Asset>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.AssetName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                i =>i.AssetType,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<Asset, AssetModel>(_mapper);

            return response;
        }
        public async Task<Paging<AssetModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Asset>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.AssetName.Contains(filterText1))),

                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                i => i.AssetType,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<Asset, AssetModel>(_mapper);

            return response;
        }
        public async Task<AssetModel> GetAssetDetailAsync(long assetId)
        {
            var data = await _unitOfWork.Repository<Asset>().FirstOrDefaultAsync(f => f.Id == assetId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User,
                i => i.AssetType,
                i => i.CompanyInfo);


            var response = _mapper.Map<Asset, AssetModel>(data);

            return response;
        }
        public async Task<AssetModel> AddAssetDetailAsync(AssetModel asset)
        {


            var entity = _mapper.Map<AssetModel, Asset>(asset);

            await _unitOfWork.Repository<Asset>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AssetModel();
        }
        public async Task<AssetModel> UpdateAssetDetailAsync(long assetId, AssetModel asset)
        {
            var entity = _mapper.Map<AssetModel, Asset>(asset);

            await _unitOfWork.Repository<Asset>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AssetModel();
        }
        public async Task<AssetModel> UpdateAssetDetailAsync(long assetId, string model)
        {
            var asset = JsonConvert.DeserializeObject<AssetModel>(model);
            var entity = _mapper.Map<AssetModel, Asset>(asset);

            await _unitOfWork.Repository<Asset>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AssetModel();
        }
        public async Task<Dropdown<AssetModel>> GetDropdownAsync(string searchText = null,
          int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Asset>().GetDropdownAsync(
                p => (string.IsNullOrEmpty(searchText) || p.AssetName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => new AssetModel { Id = se.Id, AssetName = se.AssetName},
                size);

            return data;
        }
    }
}
