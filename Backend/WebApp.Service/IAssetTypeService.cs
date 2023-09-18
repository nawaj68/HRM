using Microsoft.AspNetCore.Http;
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
    public interface IAssetTypeService : IBaseService<AssetType>
    {
        Task<Dropdown<AssetTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<AssetTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<AssetTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<AssetTypeModel> GetAssetTypeDetailAsync(long assetTypeId);
        Task<AssetTypeModel> AddAssetTypeDetailAsync(AssetTypeModel model);
        Task<AssetTypeModel> UpdateAssetTypeDetailAsync(long assetTypeId, AssetTypeModel model);
        Task<AssetTypeModel> UpdateAssetTypeDetailAsync(long assetTypeId, string model, List<IFormFile> images);
    }
}
