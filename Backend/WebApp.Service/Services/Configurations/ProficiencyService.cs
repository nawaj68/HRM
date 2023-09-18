using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Service.Models.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Service.Services.Configurations
{
    public class ProficiencyService : BaseService<Proficiency>, IProficiencyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProficiencyService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {this._unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<ProficiencyModel> AddProficiencyDetailsAsync(ProficiencyModel model)
        {
            var entity = _mapper.Map<ProficiencyModel, Proficiency>(model);
            await _unitOfWork.Repository<Proficiency>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new ProficiencyModel();
        }

        public async Task<Dropdown<ProficiencyModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<Proficiency>().GetDropdownAsync(
                p=>(string.IsNullOrEmpty(searchText)||p.ProficiencyName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=> new ProficiencyModel { Id = se.Id, ProficiencyName=se.ProficiencyName},
                size);
            return data;
        }

        public Task<Paging<ProficiencyModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null)
        {
            throw new NotImplementedException();
        }

        public async Task<ProficiencyModel> GetProficiencyDetailsAsync(long proficiencyId)
        {
            var data = await _unitOfWork.Repository<Proficiency>().FirstOrDefaultAsync(f=>f.Id == proficiencyId);
            return _mapper.Map<Proficiency,ProficiencyModel>(data);
        }

        public async Task<Paging<ProficiencyModel>> GetSearchAsync(int pageIndex = 0, int pageSize = 10, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Proficiency>().GetPageAsync(pageIndex,pageSize,
                p=>(string.IsNullOrEmpty(searchText)|p.ProficiencyName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se);
            return data.ToPagingModel<Proficiency, ProficiencyModel>(_mapper);
        }

        public async Task<ProficiencyModel> UpdateProficiencyDetailsAsync(ProficiencyModel model)
        {
            var entity = _mapper.Map<ProficiencyModel, Proficiency>(model);
            await _unitOfWork.Repository<Proficiency>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new ProficiencyModel();
        }

        public Task<ProficiencyModel> UpdateProficiencyDetailsAsync(long proficiencyId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
