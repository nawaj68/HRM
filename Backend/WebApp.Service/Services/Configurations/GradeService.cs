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
    public class GradeService : BaseService<Grade> ,IGradeService

    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GradeService(IUnitOfWork unitOfWork,
                IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<Dropdown<GradeModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<Grade>().GetDropdownAsync(
            p => (string.IsNullOrEmpty(searchText) || p.GradeName.Contains(searchText)),
            o => o.OrderBy(ob => ob.Id),
            se => new GradeModel { Id = se.Id, GradeName = se.GradeName },
            size
            );
            return data;
        }
        public async Task<Paging<GradeModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Grade>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.GradeName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<Grade, GradeModel>(_mapper);

            return response;
        }
        public async Task<Paging<GradeModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Grade>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.GradeName.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.CompanyInfo);

            var response = data.ToPagingModel<Grade, GradeModel>(_mapper);

            return response;
        }
        public async Task<GradeModel> GetGradeDetailAsync(long gradeId)
        {
            var data = await _unitOfWork.Repository<Grade>().FirstOrDefaultAsync(f => f.Id == gradeId,
                o => o.OrderBy(ob => ob.Id),
                i => i.CompanyInfo
                );


            var response = _mapper.Map<Grade, GradeModel>(data);

            return response;
        }
        public async Task<GradeModel> AddGradeDetailAsync(GradeModel grade)
        {


            var entity = _mapper.Map<GradeModel, Grade>(grade);

            await _unitOfWork.Repository<Grade>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new GradeModel();
        }
        public async Task<GradeModel> UpdateGradeDetailAsync(long gradeId, GradeModel grade)
        {
            var entity = _mapper.Map<GradeModel,Grade>(grade);

            await _unitOfWork.Repository<Grade>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new GradeModel();
        }
        public async Task<GradeModel> UpdateGradeDetailAsync(long gradeId, string model)
        {
            var grade = JsonConvert.DeserializeObject<GradeModel>(model);
            var entity = _mapper.Map<GradeModel, Grade>(grade);

            await _unitOfWork.Repository<Grade>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new GradeModel();
        }
    }
}
