using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IAwardInfoService:IBaseService<AwardInfo>
    {
        Task<Dropdown<AwardInfoModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<AwardInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<AwardInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<AwardInfoModel> GetAwardInfoDetailAsync(long awardinfoId);
        Task<AwardInfoModel> AddAwardInfoDetailAsync(AwardInfoModel model);
        Task<AwardInfoModel> UpdateAwardInfoDetailAsync(long awardinfoId, AwardInfoModel model);
        Task<AwardInfoModel> UpdateAwardInfoDetailAsync(long awardinfoId, string model, List<IFormFile> images);

    }
}
