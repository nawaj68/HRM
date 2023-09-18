using AutoMapper;
using Newtonsoft.Json;
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
   public class EmploymentCategoryService : BaseService<EmploymentCategorie> , IEmploymentCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public EmploymentCategoryService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<EmploymentCategoryModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<EmploymentCategorie>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.CategoryName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new EmploymentCategoryModel { Id = se.Id, CategoryName = se.CategoryName },
                 size
                 );
            return data;
        }
        public async Task<Paging<EmploymentCategoryModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<EmploymentCategorie>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.CategoryName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<EmploymentCategorie, EmploymentCategoryModel>(_mapper);

            return response;
        }
        public async Task<Paging<EmploymentCategoryModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<EmploymentCategorie>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.CategoryName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<EmploymentCategorie, EmploymentCategoryModel>(_mapper);

            return response;
        }
        public async Task<EmploymentCategoryModel> GetEmploymentCategorieDetailAsync(long employmentcategorieId)
        {
            var data = await _unitOfWork.Repository<EmploymentCategorie>().FirstOrDefaultAsync(f => f.Id == employmentcategorieId,
                o => o.OrderBy(ob => ob.Id),
                i => i.CompanyInfo
                );


            var response = _mapper.Map< EmploymentCategorie, EmploymentCategoryModel >(data);

            return response;
        }
        public async Task<EmploymentCategoryModel> AddEmploymentCategorieDetailAsync(EmploymentCategoryModel employmentcategorie)
        {


            var entity = _mapper.Map<EmploymentCategoryModel, EmploymentCategorie>(employmentcategorie);

            await _unitOfWork.Repository<EmploymentCategorie>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EmploymentCategoryModel();
        }
        public async Task<EmploymentCategoryModel> UpdateEmploymentCategorieDetailAsync(long employmentcategorieId, EmploymentCategoryModel employmentcategorie)
        {
            var entity = _mapper.Map<EmploymentCategoryModel, EmploymentCategorie>(employmentcategorie);

            await _unitOfWork.Repository<EmploymentCategorie>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EmploymentCategoryModel();
        }
        public async Task<EmploymentCategoryModel> UpdateEmploymentCategorieDetailAsync(long employmentcategorieId, string model)
        {
            var employmentcategorie = JsonConvert.DeserializeObject<EmploymentCategoryModel>(model);
            var entity = _mapper.Map<EmploymentCategoryModel, EmploymentCategorie>(employmentcategorie);

            await _unitOfWork.Repository<EmploymentCategorie>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EmploymentCategoryModel();
        }
    }
}
