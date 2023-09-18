using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IHobbyTypeService:IBaseService<HobbyType>
    {
        Task<Dropdown<HobbyTypeModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<HobbyTypeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<HobbyTypeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<HobbyTypeModel> AddHobbyTypeDetailsAsync(HobbyTypeModel model);
        Task<HobbyTypeModel> UpdateHobbyTypeDetailsAsync(long hobbyTypeId, HobbyTypeModel model);
        
        Task<HobbyTypeModel> GetHobbyTypeDetailsAsync(long hobbyTypeId);
    }
}
