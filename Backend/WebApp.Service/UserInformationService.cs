using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Core;
using WebApp.Core.Collections;
using WebApp.Service.Models;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service
{
    public class UserInformationService : BaseService<UserInformation>, IUserInformationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UserInformationService(IUnitOfWork unitOfWork,
                IMapper mapper,
                IWebHostEnvironment webHostEnvironment,
                IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<Paging<UserInformationModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<UserInformation>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Firstname.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                j =>j.Country,
                k => k.State,
                l => l.City,
                m => m.Gender,
                i => i.Religion,
                i => i.MaritalStatus);

            var response = data.ToPagingModel<UserInformation, UserInformationModel>(_mapper);

            return response;
        }

        public async Task<Paging<UserInformationModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null, string filterText2 = null)
        {
            var data = await _unitOfWork.Repository<UserInformation>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Firstname.Contains(filterText1))
                    || (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                j => j.Country,
                k => k.State,
                l => l.City,
                m => m.Gender,
                i => i.MaritalStatus,
                i => i.Religion);

            var response = data.ToPagingModel<UserInformation, UserInformationModel>(_mapper);

            return response;
        }

        public async Task<UserInformationModel> GetUserDetailAsync(long userInformationId)
        {
            var data = await _unitOfWork.Repository<UserInformation>().FirstOrDefaultAsync(f => f.Id == userInformationId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User,
                j => j.Country,
                k => k.State,
                l => l.City,
                m => m.Gender,
                i => i.MaritalStatus,
                i => i.Religion,
                i => i.UserBasicInformations,
                i => i.UserHobbyInformations,
                i => i.UserAddressInformations,
                i => i.UserEducationalInformations,
                i => i.UserProfessionalInformations,
                i => i.UserCertifications,
                i => i.UserSkills);

            var response = _mapper.Map<UserInformation, UserInformationModel>(data);

            return response;
        }

        public async Task<UserInformationModel> AddUserDetailAsync(UserInformationModel userInformation)
        {
            string uniqueFileName = string.Empty;
            if (userInformation.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + userInformation.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    userInformation.AvatarFile.CopyTo(fileStream);
                }

                userInformation.Avatar = uniqueFileName;
            }

            var entity = _mapper.Map<UserInformationModel, UserInformation>(userInformation);

            await _unitOfWork.Repository<UserInformation>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new UserInformationModel();
        }

        public async Task<UserInformationModel> UpdateUserDetailAsync(long userInformationId, UserInformationModel userInformation)
        {
            string uniqueFileName = string.Empty;
            if (userInformation.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + userInformation.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    userInformation.AvatarFile.CopyTo(fileStream);
                }

                userInformation.Avatar = uniqueFileName;
            }
            else
            {
                userInformation.Avatar = userInformation.Avatar?.Split("/")?.LastOrDefault();
            }


            var entity = _mapper.Map<UserInformationModel, UserInformation>(userInformation);

            await _unitOfWork.Repository<UserInformation>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new UserInformationModel();
        }

        public async Task<UserInformationModel> UpdateUserDetailAsync(long userInformationId, string model, List<IFormFile> images)
        {
            var image = images.FirstOrDefault();
            var userInformation = JsonConvert.DeserializeObject<UserInformationModel>(model);
            string uniqueFileName = string.Empty;
            if (image != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                 uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    image.CopyTo(fileStream);
                }
            }

            userInformation.Avatar = uniqueFileName;

            var entity = _mapper.Map<UserInformationModel, UserInformation>(userInformation);

            await _unitOfWork.Repository<UserInformation>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new UserInformationModel();
        }
    }
}
