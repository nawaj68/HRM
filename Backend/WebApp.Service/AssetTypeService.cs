using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
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
    public class AssetTypeService : BaseService<AssetType>, IAssetTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AssetTypeService(IUnitOfWork unitOfWork,
      IMapper mapper,
      IWebHostEnvironment webHostEnvironment,
      IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Dropdown<AssetTypeModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<AssetType>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.AssetName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new AssetTypeModel { Id = se.Id, AssetName = se.AssetName },
                 size
                 );
            return data;
        }
        public async Task<Paging<AssetTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<AssetType>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.AssetName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<AssetType, AssetTypeModel>(_mapper);

            return response;
        }
        public async Task<Paging<AssetTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<AssetType>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.AssetName.Contains(filterText1))),

                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<AssetType, AssetTypeModel>(_mapper);

            return response;
        }
        public async Task<AssetTypeModel> GetAssetTypeDetailAsync(long assetTypeId)
        {
            var data = await _unitOfWork.Repository<AssetType>().FirstOrDefaultAsync(f => f.Id == assetTypeId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User);


            var response = _mapper.Map<AssetType, AssetTypeModel>(data);

            return response;
        }
        public async Task<AssetTypeModel> AddAssetTypeDetailAsync(AssetTypeModel assetType)
        {
            string uniqueFileName = string.Empty;
            if (assetType.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + assetType.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    assetType.AvatarFile.CopyTo(fileStream);
                }

                assetType.Avatar = uniqueFileName;
            }


            var entity = _mapper.Map<AssetTypeModel, AssetType>(assetType);

            await _unitOfWork.Repository<AssetType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AssetTypeModel();
        }
        public async Task<AssetTypeModel> UpdateAssetTypeDetailAsync(long assettypeId, AssetTypeModel assetType)
        {
            string uniqueFileName = string.Empty;
            if (assetType.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + assetType.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    assetType.AvatarFile.CopyTo(fileStream);
                }

                assetType.Avatar = uniqueFileName;
            }
            else
            {
                assetType.Avatar = assetType.Avatar?.Split("/")?.LastOrDefault();
            }
            var entity = _mapper.Map<AssetTypeModel, AssetType>(assetType);

            await _unitOfWork.Repository<AssetType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AssetTypeModel();
        }
        public async Task<AssetTypeModel> UpdateAssetTypeDetailAsync(long assetTypeId, string model, List<IFormFile> images)
        {
            var image = images.FirstOrDefault();
            var assettype = JsonConvert.DeserializeObject<AssetTypeModel>(model);
            string uniqueFileName = string.Empty;
            if (image != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }
            }

            assettype.Avatar = uniqueFileName;
            //var branch = JsonConvert.DeserializeObject<AssetTypeModel>(model);
            var entity = _mapper.Map<AssetTypeModel, AssetType>(assettype);

            await _unitOfWork.Repository<AssetType>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AssetTypeModel();
        }

    }
}
