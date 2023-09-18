using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Extensions;
using WebApp.Helpers.Base;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;

namespace WebApp.Controllers.Configurations
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenderController : GenericBaseController<Gender>
    {
        private readonly IGenderService _genderService;

        public GenderController(IGenderService genderService) : base(genderService)
        {
            _genderService = genderService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _genderService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _genderService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }
        [HttpGet("{genderId}")]
        public async Task<IActionResult> GetContactDetailsAsync(long genderId)
        {
            var res = await _genderService.GetGenderDetailsAsync(genderId);

            return new ApiOkActionResult(res);
        }

        [HttpPost()]
        public async Task<IActionResult> AddBloodGroupDetailsAsync([FromForm] GenderModel model)
        {
            var res = await _genderService.AddGenderDetailsAsync(model);

            return new ApiOkActionResult(res);
        }

        [HttpPut("{genderId}")]
        public async Task<IActionResult> UpdateContactDetailsAsync(long genderId, [FromForm] GenderModel model)
        {

            var res = await _genderService.UpdateGenderDetailsAsync(genderId, model);

            return new ApiOkActionResult(res);
        }
    }
}
