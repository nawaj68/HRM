using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using WebApp.Core;
using WebApp.Service.Models.Configurations;
using WebApp.Service.Models.Enrols;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class EmployeesModel : MasterModel
    {
        public EmployeesModel()
        {

        }
        public long? UserId { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public long? GenderId { get; set; }
        public string Address { get; set; }
        public int BasicSalary { get; set; }
        public bool Status { get; set; }
        public DateTime JoiningDate { get; set; }
        public DateTime ResignDate { get; set; }
        public long? DepartmentId { get; set; }
        public long? DesignationId { get; set; }

        public string AcountName { get; set; }
        public string AcountNumber { get; set; }
        public string SwiftCode { get; set; }
        public string Brance { get; set; }
        public string Avatar { get; set; }
        public IFormFile AvatarFile { get; set; }
        public UserModel User { get; set; }
        public GenderModel Gender { get; set; }
        public DepartmentModel Department { get; set; }
        public DesignationModel Designation { get; set; }
    }
}
