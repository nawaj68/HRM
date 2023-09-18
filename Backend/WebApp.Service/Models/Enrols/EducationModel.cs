using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Service.Models.Configurations;
using WebApp.Sql.Entities.Configurations;
using WebApp.Sql.Entities.Enrols;

namespace WebApp.Service.Models.Enrols
{
    public class EducationModel:MasterModel
    {
        public EducationModel()
        {
                
        }
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

        public EmployeesModel Employees { get; set; }
        public EducationGroupModel EducationGroup { get; set; }
        public EducationTypeModel EducationType { get; set; }
        public GradeModel Grade { get; set; }
        public InstituteModel Institute { get; set; }
    }
}
