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
    public interface IAssetService : IBaseService<Asset>
    {
        Task<Dropdown<AssetModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<AssetModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<AssetModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<AssetModel> GetAssetDetailAsync(long assetId);
        Task<AssetModel> AddAssetDetailAsync(AssetModel model);
        Task<AssetModel> UpdateAssetDetailAsync(long assetId, AssetModel model);
        Task<AssetModel> UpdateAssetDetailAsync(long assetId, string model);
    }
}
