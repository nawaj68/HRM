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
    public interface IBranchInfoService : IBaseService<BranchInfo>
    {
        Task<Dropdown<BranchInfoModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<BranchInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<BranchInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<BranchInfoModel> GetBranchInfoDetailAsync(long branchInfoId);
        Task<BranchInfoModel> AddBranchInfoDetailAsync(BranchInfoModel model);
        Task<BranchInfoModel> UpdateBranchInfoDetailAsync(long branchInfoId, BranchInfoModel model);
        Task<BranchInfoModel> UpdateBranchInfoDetailAsync(long branchInfoId, string model);
    }
}
