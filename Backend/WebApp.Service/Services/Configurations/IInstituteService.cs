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
    public interface IInstituteService : IBaseService<Institute>
    {
        Task<Dropdown<InstituteModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<InstituteModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<InstituteModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<InstituteModel> GetInstituteDetailAsync(long instituteId);
        Task<InstituteModel> AddInstituteDetailAsync(InstituteModel model);
        Task<InstituteModel> UpdateInstituteDetailAsync(long instituteId, InstituteModel model);
        Task<InstituteModel> UpdateInstituteDetailAsync(long instituteId, string model);
    }
}
