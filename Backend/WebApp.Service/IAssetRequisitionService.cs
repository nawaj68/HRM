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
    public interface IAssetRequisitionService : IBaseService<AssetRequisition>
    {
        Task<Paging<AssetRequisitionModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<AssetRequisitionModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);
        Task<AssetRequisitionModel> GetAssetRequisitionDetailAsync(long assetRequisitiontId);
        Task<AssetRequisitionModel> AddAssetRequisitionDetailAsync(AssetRequisitionModel model);
        Task<AssetRequisitionModel> UpdateAssetRequisitionDetailAsync(long assetRequisitionId, AssetRequisitionModel model);
    }
}
