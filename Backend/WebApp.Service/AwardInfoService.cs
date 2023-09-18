using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
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

namespace WebApp.Service
{
    public class AwardInfoService : BaseService<AwardInfo>, IAwardInfoService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AwardInfoService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment,
              IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<Paging<AwardInfoModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<AwardInfo>().GetPageAsync(pageIndex, pageSize,

                s => (string.IsNullOrEmpty(searchText) || s.AwardName.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User
                );
            var response = data.ToPagingModel<AwardInfo, AwardInfoModel>(_mapper);
            return response;
        }
        public async Task<Paging<AwardInfoModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<AwardInfo>().GetPageAsync(pageIndex, pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.AwardName.Contains(filterText1))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User
                );
            var response = data.ToPagingModel<AwardInfo, AwardInfoModel>(_mapper);
            return response;
        }
        public async Task<AwardInfoModel> GetAwardInfoDetailAsync(long awardinfoId)
        {
            var data = await _unitOfWork.Repository<AwardInfo>().FirstOrDefaultAsync(f => f.Id == awardinfoId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User);
            var response = _mapper.Map<AwardInfo, AwardInfoModel>(data);
            return response;
        }
        public async Task<AwardInfoModel> AddAwardInfoDetailAsync(AwardInfoModel model)
        {
            string uniqueFileName = string.Empty;
            if (model.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.AvatarFile.CopyTo(fileStream);
                }

                model.Avatar = uniqueFileName;
            }

            var entity = _mapper.Map<AwardInfoModel, AwardInfo>(model);
            await _unitOfWork.Repository<AwardInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AwardInfoModel();
        }
        public async Task<AwardInfoModel> UpdateAwardInfoDetailAsync(long awardinfoId, AwardInfoModel model)
        {
            string uniqueFileName = string.Empty;
            if (model.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + model.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    model.AvatarFile.CopyTo(fileStream);
                }
                model.Avatar = uniqueFileName;
            }
            {
                model.Avatar = model.Avatar?.Split("/")?.LastOrDefault();
            }

            var entity = _mapper.Map<AwardInfoModel, AwardInfo>(model);
            await _unitOfWork.Repository<AwardInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AwardInfoModel();
        }
        public async Task<AwardInfoModel> UpdateAwardInfoDetailAsync(long awardinfoId, string model, List<IFormFile> images)
        {
            var image = images.FirstOrDefault();
            var awardinfo = JsonConvert.DeserializeObject<AwardInfoModel>(model);
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

            awardinfo.Avatar = uniqueFileName;
            var entity = _mapper.Map<AwardInfoModel, AwardInfo>(awardinfo);
            await _unitOfWork.Repository<AwardInfo>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new AwardInfoModel();
        }
        public async Task<Dropdown<AwardInfoModel>> GetDropdownAsync(string searchText = null, int size = CommonVariables.DropdownSize)
        {
            var data = await _unitOfWork.Repository<AwardInfo>().GetDropdownAsync(
                  p => (string.IsNullOrEmpty(searchText) || p.AwardName.Contains(searchText)),
                  o => o.OrderBy(ob => ob.Id),
                  se => new AwardInfoModel { Id = se.Id, AwardName = se.AwardName },
                  size
                  );
            return data;
        }

    }
}
