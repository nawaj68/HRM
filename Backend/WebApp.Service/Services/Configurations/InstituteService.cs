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
    public class InstituteService : BaseService<Institute>,IInstituteService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public InstituteService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<InstituteModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<Institute>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.InstituteName.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new InstituteModel { Id = se.Id, InstituteName = se.InstituteName },
                 size
                 );
            return data;
        }
        public async Task<Paging<InstituteModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Institute>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.InstituteName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<Institute, InstituteModel>(_mapper);

            return response;
        }
        public async Task<Paging<InstituteModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Institute>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.InstituteName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<Institute, InstituteModel>(_mapper);

            return response;
        }
        public async Task<InstituteModel> GetInstituteDetailAsync(long instituteId)
        {
            var data = await _unitOfWork.Repository<Institute>().FirstOrDefaultAsync(f => f.Id == instituteId,
                o => o.OrderBy(ob => ob.Id),
                i => i.CompanyInfo
                );


            var response = _mapper.Map<Institute, InstituteModel>(data);

            return response;
        }
        public async Task<InstituteModel> AddInstituteDetailAsync(InstituteModel institute)
        {


            var entity = _mapper.Map<InstituteModel, Institute>(institute);

            await _unitOfWork.Repository<Institute>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new InstituteModel();
        }
        public async Task<InstituteModel> UpdateInstituteDetailAsync(long instituteId, InstituteModel institute)
        {
            var entity = _mapper.Map<InstituteModel, Institute>(institute);

            await _unitOfWork.Repository<Institute>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new InstituteModel();
        }
        public async Task<InstituteModel> UpdateInstituteDetailAsync(long instituteId, string model)
        {
            var grade = JsonConvert.DeserializeObject<InstituteModel>(model);
            var entity = _mapper.Map<InstituteModel, Institute>(grade);

            await _unitOfWork.Repository<Institute>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new InstituteModel();
        }
    }
}
