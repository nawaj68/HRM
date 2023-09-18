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
    public interface IWarningService : IBaseService<Warning>
    {
        Task<Paging<WarningModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<WarningModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);
        Task<WarningModel> GetWarningDetailAsync(long warningId);
        Task<WarningModel> AddWarningDetailAsync(WarningModel model);
        Task<WarningModel> UpdateWarningDetailAsync(long warningId, WarningModel model);
    }
}
