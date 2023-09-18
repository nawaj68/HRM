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
    public class LanguageController : GenericBaseController<Language>
    {
        private readonly ILanguageService _languageService;

        public LanguageController(ILanguageService languageService) : base(languageService)
        {
            this._languageService = languageService;
        }

        [HttpGet("dropdown")]
        public async Task<IActionResult> GetDropdownAsync(string searchText = null)
        {
            var res = await _languageService.GetDropdownAsync(searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var res = await _languageService.GetSearchAsync(pageIndex, pageSize, searchText);

            return new ApiOkActionResult(res);
        }

        [HttpGet("filter")]
        public async Task<IActionResult> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null /*string filterText2 = null*/)
        {
            var res = await _languageService.GetFilterAsync(pageIndex, pageSize, filterText1 /*filterText2*/);

            return new ApiOkActionResult(res);
        }

        [HttpGet("{languageId}")]
        public async Task<IActionResult> GetLanguageDetailAsync(long languageId)
        {
            var res = await _languageService.GetLanguageDetailAsync(languageId);

            return new ApiOkActionResult(res);
        }
        [HttpPost()]
        public async Task<IActionResult> AddLanguageDetailAsync([FromForm] LanguageModel model)
        {
            var res = await _languageService.AddLanguageDetailAsync(model);

            return new ApiOkActionResult(res);
        }
        [HttpPut("{languageId}")]
        public async Task<IActionResult> UpdateLanguageDetailAsync(long languageId, [FromForm] LanguageModel model)
        {

            var res = await _languageService.UpdateLanguageDetailAsync(languageId, model);

            return new ApiOkActionResult(res);
        }
    }
}
