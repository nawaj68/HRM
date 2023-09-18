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
    public interface IEducationService:IBaseService<Education>
    {
        Task<Dropdown<EducationModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize); 
        Task<Paging<EducationModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<EducationModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<EducationModel> GetEducationDetailsAsync(long educationId);
        Task<EducationModel> AddEducationDetailsAsync(EducationModel model);
        Task<EducationModel> UpdateEducationDetailsAsync(long educationId, EducationModel model);
        Task<EducationModel> UpdateEducationDetailsAsync(long educationId, string model);

    }
}
