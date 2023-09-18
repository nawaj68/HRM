using AutoMapper;
using MassTransit;
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
    public class LanguageService : BaseService<Language>, ILanguageService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public LanguageService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<LanguageModel> AddLanguageDetailAsync(LanguageModel model)
        {
            var entity = _mapper.Map<LanguageModel, Language>(model);

            await _unitOfWork.Repository<Language>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new LanguageModel();
        }

        public async Task<Dropdown<LanguageModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<Language>().GetDropdownAsync(
                p =>(string.IsNullOrEmpty(searchText)|p.LanguageName.Contains(searchText)),
                o=>o.OrderBy(ob=>ob.Id),
                se=> new LanguageModel { Id=se.Id, LanguageName=se.LanguageName },
                size);
            return data;
        }

        public async Task<Paging<LanguageModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Language>().GetPageAsync(pageIndex,pageSize,
                p=>(string.IsNullOrEmpty(filterText1)|p.LanguageName.Contains(filterText1)),
                o=>o.OrderBy(ob=>ob.Id),
                se=>se);
            return data.ToPagingModel<Language, LanguageModel>(_mapper);
        }

        public async Task<LanguageModel> GetLanguageDetailAsync(long languageId)
        {
            var data = await _unitOfWork.Repository<Language>().FirstOrDefaultAsync(f => f.Id == languageId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User);
            return _mapper.Map<Language, LanguageModel>(data);
            
        }

        public async Task<Paging<LanguageModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Language>().GetPageAsync(pageIndex, pageSize,
                p => (string.IsNullOrEmpty(searchText) | p.LanguageName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se);
            return data.ToPagingModel<Language, LanguageModel>(_mapper);
        }

        public async Task<LanguageModel> UpdateLanguageDetailAsync(long languageId, LanguageModel model)
        {
            var entity = _mapper.Map<LanguageModel, Language>(model);
            await _unitOfWork.Repository<Language>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new LanguageModel();
        }

        public async Task<LanguageModel> UpdateLanguageDetailAsync(long languageId, string model)
        {
            var langauge = JsonConvert.DeserializeObject<LanguageModel>(model);

            var entity = _mapper.Map<LanguageModel, Language>(langauge);
            await _unitOfWork.Repository<Language>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();
            return new LanguageModel();
        }
    }
}
