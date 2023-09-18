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
    public interface IFamilyInfoService : IBaseService<FamilyInfo>
    {
        Task<Paging<FamilyInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<FamilyInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);

        Task<FamilyInfoModel> GetFamilyInfoDetailAsync(long employeesId);
        Task<FamilyInfoModel> AddFamilyInfoDetailAsync(FamilyInfoModel model);
        Task<FamilyInfoModel> UpdateFamilyInfoDetailAsync(long employeesId, FamilyInfoModel model);
        Task<FamilyInfoModel> UpdateFamilyInfoDetailAsync(long employeesId, string model);
    }
}
