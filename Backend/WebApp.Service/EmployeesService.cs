using AutoMapper;
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
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Services;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Services
{
    public class EmployeesService : BaseService<Employees>, IEmployeesService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public EmployeesService(IUnitOfWork unitOfWork,
              IMapper mapper,
              IWebHostEnvironment webHostEnvironment,
              IOptions<AppSettings> appSettings) : base(unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            _mapper = mapper;
            _webHostEnvironment = webHostEnvironment;
        }
        public async Task<Paging<EmployeesModel>> GetSearchAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string searchText = null)
        {
            var data = await _unitOfWork.Repository<Employees>().GetPageAsync(pageIndex,
                pageSize,
                s => (string.IsNullOrEmpty(searchText) || s.Name.Contains(searchText)),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                i => i.Department,
                i => i.Designation,
                i => i.Gender);

            var response = data.ToPagingModel<Employees, EmployeesModel>(_mapper);

            return response;
        }
        public async Task<Paging<EmployeesModel>> GetFilterAsync(int pageIndex = CommonVariables.pageIndex, int pageSize = CommonVariables.pageSize, string filterText1 = null)
        {
            var data = await _unitOfWork.Repository<Employees>().GetPageAsync(pageIndex,
                pageSize,
                s => ((string.IsNullOrEmpty(filterText1) || s.Name.Contains(filterText1))),
                    //|| (string.IsNullOrEmpty(filterText2) || s.Lastname.Contains(filterText2))),
                o => o.OrderBy(ob => ob.Id),
                se => se,
                i => i.User,
                i => i.Department,
                i => i.Designation,
                i => i.Gender);

            var response = data.ToPagingModel<Employees, EmployeesModel>(_mapper);

            return response;
        }

        public async Task<EmployeesModel> GetEmployeesDetailAsync(long employeesId)
        {
            var data = await _unitOfWork.Repository<Employees>().FirstOrDefaultAsync(f => f.Id == employeesId,
                o => o.OrderBy(ob => ob.Id),
                i => i.User,
                i => i.Department,
                i => i.Designation,
                i => i.Gender);
               

            var response = _mapper.Map<Employees, EmployeesModel>(data);

            return response;
        }
        public async Task<EmployeesModel> AddEmployeesDetailAsync(EmployeesModel employees)
        {
            string uniqueFileName = string.Empty;
            if (employees.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + employees.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    employees.AvatarFile.CopyTo(fileStream);
                }

                employees.Avatar = uniqueFileName;
            }

            var entity = _mapper.Map<EmployeesModel, Employees>(employees);
            await _unitOfWork.Repository<Employees>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EmployeesModel();
        }

        public async Task<EmployeesModel> UpdateEmployeesDetailAsync(long employeesId, EmployeesModel employees)
        {
            string uniqueFileName = string.Empty;
            if (employees.AvatarFile != null)
            {
                string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, CommonVariables.AvatarLocation);
                uniqueFileName = Guid.NewGuid().ToString() + "_" + employees.AvatarFile.FileName;
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    employees.AvatarFile.CopyTo(fileStream);
                }
                employees.Avatar = uniqueFileName;
            }
            else
            {
                employees.Avatar = employees.Avatar?.Split("/")?.LastOrDefault();
            }


            var entity = _mapper.Map<EmployeesModel, Employees>(employees);

            await _unitOfWork.Repository<Employees>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EmployeesModel();
        }

        public async Task<EmployeesModel> UpdateEmployeesDetailAsync(long employeesId, string model, List<IFormFile> images)
        {
            var image = images.FirstOrDefault();
            var employees = JsonConvert.DeserializeObject<EmployeesModel>(model);
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

            employees.Avatar = uniqueFileName;

            var entity = _mapper.Map<EmployeesModel, Employees>(employees);

            await _unitOfWork.Repository<Employees>().UpdateAsync(entity);
            await _unitOfWork.CompleteAsync();

            return new EmployeesModel();
        }

        public async Task<Dropdown<EmployeesModel>> GetDropdownAsync(string searchText = null, int size = 15)
        {
            var data = await _unitOfWork.Repository<Employees>().GetDropdownAsync(
                 p => (string.IsNullOrEmpty(searchText) || p.Name.Contains(searchText)),
                 o => o.OrderBy(ob => ob.Id),
                 se => new EmployeesModel { Id = se.Id, Name = se.Name },
                 size
                 );
            return data;
        }
    }
}
