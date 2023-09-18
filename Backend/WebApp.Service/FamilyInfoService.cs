using AutoMapper;
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
//using WebApp.Sql.Migrations;

namespace WebApp.Service
{
    public class FamilyInfoService : BaseService<FamilyInfo>, IFamilyInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FamilyInfoService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<FamilyInfoModel> AddFamilyInfoDetailAsync(FamilyInfoModel model)
        {
            var entity = _mapper.Map<FamilyInfoModel, FamilyInfo>(model);

            await _unitOfWork.Repository<FamilyInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new FamilyInfoModel();
        }
        public async Task<Paging<FamilyInfoModel>> GetFilterAsync(int pageIndex = 0, int pageSize = 10, string filterText1 = null, string filterText2 = null)
        {
            var data = await _unitOfWork.Repository<FamilyInfo>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Employees.Name.Contains(filterText1) || string.IsNullOrEmpty(filterText2) || s.User.UserName.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);
            var response = data.ToPagingModel<FamilyInfo, FamilyInfoModel>(_mapper);
            return response;
        }

        public async Task<Paging<FamilyInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<FamilyInfo>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Employees.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<FamilyInfo, FamilyInfoModel>(_mapper);

            return response;
        }

        public async Task<FamilyInfoModel> GetFamilyInfoDetailAsync(long familyInfoId)
        {
            var data = await _unitOfWork.Repository<FamilyInfo>().FirstOrDefaultAsync(f=>f.Id==familyInfoId,
                o=>o.OrderBy(m=>m.Id),
                i=>i.User);
            return _mapper.Map<FamilyInfo, FamilyInfoModel>(data);
        }

        public async Task<FamilyInfoModel> UpdateFamilyInfoDetailAsync(long employeesId, FamilyInfoModel model)
        {
            var entity = _mapper.Map<FamilyInfoModel, FamilyInfo>(model);
            await _unitOfWork.Repository<FamilyInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new FamilyInfoModel();
        }

        public async Task<FamilyInfoModel> UpdateFamilyInfoDetailAsync(long employeesId, string model)
        {
            var familyInfo = JsonConvert.DeserializeObject<FamilyInfoModel>(model);
            var entity = _mapper.Map<FamilyInfoModel, FamilyInfo>(familyInfo);
            await _unitOfWork.Repository<FamilyInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            
            return new FamilyInfoModel();
        }
    }
}
