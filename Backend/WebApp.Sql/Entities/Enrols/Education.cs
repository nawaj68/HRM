using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Sql.Entities.Configurations;
//using WebApp.Sql.Migrations;

namespace WebApp.Sql.Entities.Enrols
{
    public class Education:BaseEntity
    {

        public long? EmployeeId { get; set; }
        public long? EgucationGroupId { get; set; }
        public long? EducationTypeId { get; set; }
        public long? GradeId { get; set; }
        public DateTime PassingYear { get; set; }
        public string Result { get; set; }
        public string Scale { get; set; }
        public long? InstituteId { get; set; }
        public string ForeignDegree { get; set; }
        public string ProfessionalDegree { get; set; }
        public string LastEducation { get; set; }
        public string Remarks { get; set; }

        public Employees Employees { get; set; }
        public EducationGroup EducationGroup { get; set; }
        public EducationType EducationType { get; set; }
        public Grade Grade { get; set; }
        public Institute Institute { get; set; }

    }
}
