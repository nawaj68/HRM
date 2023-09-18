using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public interface IUserInformationService : IBaseService<UserInformation>
    {
        Task<Paging<UserInformationModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null);
        Task<Paging<UserInformationModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null);

        Task<UserInformationModel> GetUserDetailAsync(long userInformationId);
        Task<UserInformationModel> AddUserDetailAsync(UserInformationModel model);
        Task<UserInformationModel> UpdateUserDetailAsync(long userInformationId, UserInformationModel model);
        Task<UserInformationModel> UpdateUserDetailAsync(long userInformationId, string model, List<IFormFile> images);
    }
}
