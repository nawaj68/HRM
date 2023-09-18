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
    public interface ILanguageService: IBaseService<Language>
    {
        Task<Dropdown<LanguageModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<LanguageModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<LanguageModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<LanguageModel> GetLanguageDetailAsync(long languageId);
        Task<LanguageModel> AddLanguageDetailAsync(LanguageModel model);
        Task<LanguageModel> UpdateLanguageDetailAsync(long languageId, LanguageModel model);
        Task<LanguageModel> UpdateLanguageDetailAsync(long languageId, string model);
    }
}
