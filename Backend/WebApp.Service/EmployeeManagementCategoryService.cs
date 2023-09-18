using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
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
    public class EmployeeManagementCategoryService : BaseService<EmployeeManagementCategory>, IEmployeeManagementCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeeManagementCategoryService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<EmployeeManagementCategoryModel> AddEmployeeManagementCategoryServiceDetailAsync(EmployeeManagementCategoryModel model)
        {
            var entity = _mapper.Map<EmployeeManagementCategoryModel, EmployeeManagementCategory>(model);
            await _unitOfWork.Repository<EmployeeManagementCategory>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new EmployeeManagementCategoryModel();
        }

        public async Task<EmployeeManagementCategoryModel> GetEmployeeManagementCategoryServiceDetailAsync(long employeeMCId)
        {
            var data = await _unitOfWork.Repository<EmployeeManagementCategory>().FirstOrDefaultAsync(f => f.Id == employeeMCId,
                o=>o.OrderBy(ob=>ob.Id),
                i=>i.User);
            var response = _mapper.Map<EmployeeManagementCategory, EmployeeManagementCategoryModel>(data);
            return response;
        }

        public async Task<Paging<EmployeeManagementCategoryModel>> GetEmployeeManagementCategoryServiceFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<EmployeeManagementCategory>().GetPageAsync(
                pageIndex,pageSize,
                s=>((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1))),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se,
                i=>i.User
                );
            var response = data.ToPagingModel<EmployeeManagementCategory, EmployeeManagementCategoryModel>(_mapper);
            return response;
        }

        public async Task<Paging<EmployeeManagementCategoryModel>> GetEmployeeManagementCategoryServiceSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<EmployeeManagementCategory>().GetPageAsync(pageIndex,pageSize,
                s=>((string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText))),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se,
                i=>i.User
                );
            var response = data.ToPagingModel<EmployeeManagementCategory, EmployeeManagementCategoryModel>(_mapper);
            return response;
        }

        public async Task<Paging<EmployeeManagementCategoryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<EmployeeManagementCategory>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User
                );
            var response = data.ToPagingModel<EmployeeManagementCategory, EmployeeManagementCategoryModel>(_mapper);
            return response;
        }

        public async Task<Paging<EmployeeManagementCategoryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<EmployeeManagementCategory>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);
            var response = data.ToPagingModel<EmployeeManagementCategory, EmployeeManagementCategoryModel>(_mapper);
            return response;
        }

        public async Task<EmployeeManagementCategoryModel> UpdateEmployeeManagementCategoryServiceDetailAsync(long employeeMCId, EmployeeManagementCategoryModel model)
        {
            var entity = _mapper.Map<EmployeeManagementCategoryModel,EmployeeManagementCategory>(model);
            await _unitOfWork.Repository<EmployeeManagementCategory>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new EmployeeManagementCategoryModel();
        }
    }
}
