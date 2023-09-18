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
    public interface IMaritalStatusService: IBaseService<MaritalStatus>
    {
        Task<Dropdown<MaritalStatusModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<MaritalStatusModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<MaritalStatusModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<MaritalStatusModel> AddMaritalStatusDetailsAsync(MaritalStatusModel model);
        Task<MaritalStatusModel> UpdateMaritalStatusDetailsAsync(long maritalStatusId, MaritalStatusModel model);
        Task<MaritalStatusModel> UpdateMaritalStatusDetailsAsync(long maritalStatusId, string model);
        Task<MaritalStatusModel> GetMaritalStatusDetailsAsync(long maritalStatusId);
    }
}
