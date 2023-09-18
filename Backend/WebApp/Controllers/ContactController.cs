using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : GenericBaseController<Contact>
    {
        private readonly IContactService _contactService;

        public ContactController(IContactService contactService) : base(contactService)
        {
            this._contactService = contactService;
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _contactService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _contactService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{contactId}")]
        public async Task<IActionResult> GetContactDetailsAsync(long contactId)
        {
            var res = await _contactService.GetContactDetailsAsync(contactId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddContactDetailsAsync([FromForm] ContactModel model)
        {
            var res = await _contactService.AddContactDetailsAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{contactId}")]
        public async Task<IActionResult> UpdateContactDetailsAsync(long contactId, [FromForm] ContactModel model)
        {

            var res = await _contactService.UpdateContactDetailsAsync(contactId, model);

            return new ApiOkActionResult(res);
        }
    }
}
