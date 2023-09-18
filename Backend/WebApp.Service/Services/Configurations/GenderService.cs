using AutoMapper;
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
    public class GenderService : BaseService<Gender>, IGenderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GenderService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<GenderModel> AddGenderDetailsAsync(GenderModel model)
        {
            var entity = _mapper.Map<GenderModel, Gender>(model);

            await _unitOfWork.Repository<Gender>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new GenderModel();
        }

        public async Task<Dropdown<GenderModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<Gender>().GetDropdownAsync(
                p=>(string.IsNullOrEmpty(searchText)||p.GenderName.Contains(searchText)),
                o=> o.OrderBy(ob => ob.Id),
                se => new GenderModel { Id = se.Id, GenderName = se.GenderName},
                size);

            return data;
        }

        public Task<Paging<GenderModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            throw new NotImplementedException();
        }

        public async Task<GenderModel> GetGenderDetailsAsync(long genderId)
        {
            var data = await _unitOfWork.Repository<Gender>().FirstOrDefaultAsync(f => f.Id == genderId);

            var response = _mapper.Map<Gender, GenderModel>(data);

            return response;
        }

        public async Task<Paging<GenderModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Gender>().GetPageAsync(pageIndex,
                pageSize);

            var response = data.ToPagingModel<Gender, GenderModel>(_mapper);

            return response;
        }

        public async Task<GenderModel> UpdateGenderDetailsAsync(long genderId, GenderModel model)
        {
            var entity = _mapper.Map<GenderModel, Gender>(model);

            await _unitOfWork.Repository<Gender>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new GenderModel();
        }

        public Task<GenderModel> UpdateGenderDetailsAsync(long genderId, string model)
        {
            throw new NotImplementedException();
        }
    }
}
