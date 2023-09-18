using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
using WebApp.Service.Models.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public interface IGenderService:IBaseService<Gender>
    {
        Task<Dropdown<GenderModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<GenderModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<GenderModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<GenderModel> AddGenderDetailsAsync(GenderModel model);
        Task<GenderModel> UpdateGenderDetailsAsync(long genderId, GenderModel model);
        Task<GenderModel> UpdateGenderDetailsAsync(long genderId, string model);
        Task<GenderModel> GetGenderDetailsAsync(long genderId);
    }
}
