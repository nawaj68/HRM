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
    public interface IDistributeAssetService : IBaseService<DistributeAsset>
    {
        Task<Paging<DistributeAssetModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DistributeAssetModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);
        Task<DistributeAssetModel> GetDistributeAssetDetailAsync(long distributeAssetId);
        Task<DistributeAssetModel> AddDistributeAssetDetailAsync(DistributeAssetModel model);
        Task<DistributeAssetModel> UpdateDistributeAssetDetailAsync(long distributeAssetId, DistributeAssetModel model);
    }
}

