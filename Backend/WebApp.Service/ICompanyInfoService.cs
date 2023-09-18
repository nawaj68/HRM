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
    public interface ICompanyInfoService : IBaseService<CompanyInfo>
    {
        Task<Dropdown<CompanyInfoModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<CompanyInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<CompanyInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<CompanyInfoModel> GetCompanyInfoDetailAsync(long conpanyInfoId);
        Task<CompanyInfoModel> AddCompanyInfoDetailAsync(CompanyInfoModel model);
        Task<CompanyInfoModel> UpdateCompanyInfoDetailAsync(long conpanyInfoId, CompanyInfoModel model);
        Task<CompanyInfoModel> UpdateCompanyInfoDetailAsync(long conpanyInfoId, string model);
    }
}
