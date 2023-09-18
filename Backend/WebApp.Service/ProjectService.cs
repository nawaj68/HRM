using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
    public class ProjectService : BaseService<Project>,IProjectService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public ProjectService(IUnitOfWork unitOfWork,
      IMapper mapper,
      IWebHostEnvironment webHostEnvironment,
      IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Dropdown<ProjectModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<Project>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.ProjectName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new ProjectModel { Id = se.Id, ProjectName = se.ProjectName },
                 size
                 );
            return data;
        }

        public async Task<Paging<ProjectModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Project>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.ProjectName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                i => i.Company,
                i => i.Branch);

            var response = data.ToPagingModel<Project, ProjectModel>(_mapper);

            return response;
        }
        public async Task<Paging<ProjectModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Project>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.ProjectName.Contains(filterText1))),

                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                i => i.Company,
                i => i.Branch);

            var response = data.ToPagingModel<Project, ProjectModel>(_mapper);

            return response;
        }
        public async Task<ProjectModel> GetProjectDetailAsync(long projectId)
        {
            var data = await _unitOfWork.Repository<Project>().FirstOrDefaultAsync(f => f.Id == projectId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User,
                i => i.Company,
                i => i.Branch);


            var response = _mapper.Map<Project, ProjectModel>(data);

            return response;
        }
        public async Task<ProjectModel> AddProjectDetailAsync(ProjectModel project)
        {


            var entity = _mapper.Map<ProjectModel, Project>(project);

            await _unitOfWork.Repository<Project>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ProjectModel();
        }
        public async Task<ProjectModel> UpdateProjectDetailAsync(long projectId, ProjectModel project)
        {
            var entity = _mapper.Map<ProjectModel, Project>(project);

            await _unitOfWork.Repository<Project>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ProjectModel();
        }
        public async Task<ProjectModel> UpdateProjectDetailAsync(long projectId, string model)
        {
            var project = JsonConvert.DeserializeObject<ProjectModel>(model);
            var entity = _mapper.Map<ProjectModel, Project>(project);

            await _unitOfWork.Repository<Project>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ProjectModel();
        }
    }
}
