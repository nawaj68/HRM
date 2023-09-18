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
    public interface IPassportService : IBaseService<Passport>
    {
        Task<Paging<PassportModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<PassportModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);
        Task<PassportModel> GetPassportDetailAsync(long passportId);
        Task<PassportModel> AddPassportDetailAsync(PassportModel model);
        Task<PassportModel> UpdatePassportDetailAsync(long passportId, PassportModel model);
    }
}
