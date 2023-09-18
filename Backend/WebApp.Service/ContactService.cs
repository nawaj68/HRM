using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
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
    public class ContactService : BaseService<Contact>, IContactService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ContactService(IUnitOfWork unitOfWork, IMapper mapper) : base(unitOfWork)
        {
           _unitOfWork = unitOfWork;
           _mapper = mapper;
        }

        public async Task<ContactModel> AddContactDetailsAsync(ContactModel model)
        {
            var entity = _mapper.Map<ContactModel, Contact>(model);

            await _unitOfWork.Repository<Contact>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ContactModel();
        }

        public async Task<ContactModel> GetContactDetailsAsync(long contactId)
        {
            var data = await _unitOfWork.Repository<Contact>().FirstOrDefaultAsync(f => f.Id == contactId,
               o => o.OrderBy(ob => ob.Id),
               i => i.User);

            var response = _mapper.Map<Contact, ContactModel>(data);

            return response;
        }

        public async Task<Paging<ContactModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Contact>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.PersonalEmail.Contains(filterText1))),
                //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<Contact, ContactModel>(_mapper);

            return response;
        }

        public async Task<Paging<ContactModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Contact>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.PersonalEmail.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User);

            var response = data.ToPagingModel<Contact, ContactModel>(_mapper);

            return response;
        }

        public async Task<ContactModel> UpdateContactDetailsAsync(long contactId, ContactModel model)
        {
            var entity = _mapper.Map<ContactModel, Contact>(model);

            await _unitOfWork.Repository<Contact>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ContactModel();
        }

        public async Task<ContactModel> UpdateContactDetailsAsync(long contactId, string model)
        {
            var contacts = JsonConvert.DeserializeObject<ContactModel>(model);
            var entity = _mapper.Map<ContactModel, Contact>(contacts);

            await _unitOfWork.Repository<Contact>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new ContactModel();
        }
    }
}
