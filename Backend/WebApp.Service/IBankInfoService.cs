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
    public interface IBankInfoService:IBaseService<BankInfo>
    {
        Task<Paging<BankInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<BankInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<BankInfoModel> GetBankInfoDetailAsync(long bankInfoId);
        Task<BankInfoModel> AddBankInfoDetailAsync(BankInfoModel model);
        Task<BankInfoModel> UpdateBankInfoDetailAsync(long bankInfoId, BankInfoModel model);


        //Task<BankInfoModel> UpdateBankInfoDetailAsync(long bankInfoId, string model, List<IFormFile> images);
        //Task<Dropdown<BankInfoModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
    }
}
