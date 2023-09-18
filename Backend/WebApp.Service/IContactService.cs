using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Core.Collections;
using WebApp.Core;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IContactService:IBaseService<Contact>
    {
        Task<Paging<ContactModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<ContactModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null);
        Task<ContactModel> GetContactDetailsAsync(long contactId);
        Task<ContactModel> AddContactDetailsAsync(ContactModel model);
        Task<ContactModel> UpdateContactDetailsAsync(long contactId, ContactModel model);
        Task<ContactModel> UpdateContactDetailsAsync(long contactId, string model);
    }
}
