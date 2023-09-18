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
    public interface IDesignationSetupService:IBaseService<DesignationSetup>
    {
        Task<Dropdown<DesignationSetupModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<DesignationSetupModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<DesignationSetupModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<DesignationSetupModel> GetDesignationSetupDetailAsync(long designationSetupId);
        Task<DesignationSetupModel> AddDesignationSetupDetailAsync(DesignationSetupModel model);
        Task<DesignationSetupModel> UpdateDesignationSetupDetailAsync(long designationSetupId, DesignationSetupModel model);
        Task<DesignationSetupModel> UpdateDesignationSetupDetailAsync(long designationSetupId, string model);
    }
}
