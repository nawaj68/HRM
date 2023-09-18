using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service;
using WebApp.Service.Models;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInformationController : GenericBaseController<UserInformation>
    {
        private readonly IUserInformationService _userPersonalInformationService;

        public UserInformationController(IUserInformationService userPersonalInformationService) : base(userPersonalInformationService)
        {
            _userPersonalInformationService = userPersonalInformationService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _userPersonalInformationService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null)
        {
            var res = await _userPersonalInformationService.GetFilterAsync(pageIndex, pageSize, filterText1, filterText2);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{userInformationId}")]
        public async Task<IActionResult> GetUserDetailAsync(long userInformationId)
        {
            var res = await _userPersonalInformationService.GetUserDetailAsync(userInformationId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddUserDetailAsync([FromForm] UserInformationModel model)
        {
            var res = await _userPersonalInformationService.AddUserDetailAsync(model);

            return new ApiOkActionResult(res);
        }

        //[HttpPut("{userInformationId}")]
        //public async Task<IActionResult> UpdateUserDetailAsync(long userInformationId, [FromForm] string userInformation, [FromForm] List<IFormFile> image)
        //{

        //    var res = await _userPersonalInformationService.UpdateUserDetailAsync(userInformationId, userInformation, image);

        //    return new ApiOkActionResult(res);
        //}

        [HttpPut("{userInformationId}")]
        public async Task<IActionResult> UpdateUserDetailAsync(long userInformationId, [FromForm] UserInformationModel userInformation)
        {

            var res = await _userPersonalInformationService.UpdateUserDetailAsync(userInformationId, userInformation);

            return new ApiOkActionResult(res);
        }
    }
}
