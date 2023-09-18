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
    public interface IOpeningYearService : IBaseService<OpeningYear>
    {
        Task<Paging<OpeningYearModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<OpeningYearModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<OpeningYearModel> GetOpeningYearDetailAsync(long openingYearId);
        Task<OpeningYearModel> AddOpeningYearDetailAsync(OpeningYearModel model);
        Task<OpeningYearModel> UpdateOpeningYearDetailAsync(long openingYearId, OpeningYearModel model);
        Task<OpeningYearModel> UpdateOpeningYearDetailAsync(long openingYearId, string model);
    }
}
