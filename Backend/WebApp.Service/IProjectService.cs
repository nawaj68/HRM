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
    public interface IProjectService : IBaseService<Project>
    {
        Task<Dropdown<ProjectModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize);
        Task<Paging<ProjectModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<ProjectModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);

        Task<ProjectModel> GetProjectDetailAsync(long projectId);
        Task<ProjectModel> AddProjectDetailAsync(ProjectModel model);
        Task<ProjectModel> UpdateProjectDetailAsync(long projectId, ProjectModel model);
        Task<ProjectModel> UpdateProjectDetailAsync(long projectId, string model);
    }
}
