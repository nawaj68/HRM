using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IClaimTypeService : IBaseService<ClaimType>
    {
        Task<Dropdown<ClaimTypeModel>> GetDropdownAsync( string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<ClaimTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<ClaimTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<ClaimTypeModel> AddClaimTypeDetailsAsync(ClaimTypeModel model);
        Task<ClaimTypeModel> UpdateClaimTypeDetailsAsync(long claimTypeId, ClaimTypeModel model);
        Task<ClaimTypeModel> UpdateClaimTypeDetailsAsync(long claimTypeId, string model);
        Task<ClaimTypeModel> GetClaimTypeDetailsAsync(long claimTypeId);
    }
}
