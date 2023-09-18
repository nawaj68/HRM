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
    public interface IAwardTypeService : IBaseService<AwardType>
    {
        Task<Dropdown<AwardTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<AwardTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<AwardTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<AwardTypeModel> GetAwardTypeDetailAsync(long awardtypeId);
        Task<AwardTypeModel> AddAwardTypeDetailAsync(AwardTypeModel model);
        Task<AwardTypeModel> UpdateAwardTypeDetailAsync(long awardtypeId, AwardTypeModel model);
        Task<AwardTypeModel> UpdateAwardTypeDetailAsync(long awardtypeId, string model);
    }
}
