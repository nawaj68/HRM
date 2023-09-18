using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using WebApp.Core;
using WebApp.Core.Acls;
using WebApp.Core.Helpers;
using WebApp.Core.Interface;
using WebApp.Service.Services;
using WebApp.Service.Services.Configurations;
using WebApp.Services;
using WebApp.Sql.Entities.Enrols;
using WebApp.Sql.Repositories;

namespace WebApp.Service
{
    public static class ServiceDependency
    {
        public static void AddServiceDependency(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient(typeof(IBaseService<>), typeof(BaseService<>));
            services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ISignInHelper, SignInHelper>();
            services.AddScoped<IUserInformationService, UserInformationService>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IStateService, StateService>();
            services.AddScoped<ICityService, CityService>();
            services.AddScoped<IEmployeesService, EmployeesService>();
            services.AddScoped<IDesignationService, DesignationService>();
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IGenderService, GenderService>();
            services.AddScoped<IMaritalStatusService, MaritalStatusService>();
            services.AddScoped<IBloodGroupService, BloodGroupService>();
            services.AddScoped<IContactService, ContactService>();
            services.AddScoped<IDepartmentSetupService, DepartmentSetupService>();
            services.AddScoped<ISupervisorService, SupervisorService>();
            services.AddScoped<IWarningService, WarningService>();
            services.AddScoped<IPassportService, PassportService>();
            services.AddScoped<IJobNewStatusService, JobNewStatusService>();
            services.AddScoped<IDistributeAssetService, DistributeAssetService>();
            services.AddScoped<IAssetRequisitionService, AssetRequisitionService>();



            services.AddScoped<IFunctionalDesignationService, FunctionalDesignationService>();
            services.AddScoped<IProficiencyService, ProficiencyService>();
            services.AddScoped<IReligionService, ReligionService>();
            services.AddScoped<IFamilyInfoService, FamilyInfoService>();
            services.AddScoped<IEmployeeManagementCategoryService, EmployeeManagementCategoryService>();
            services.AddScoped<IBankInfoService, BankInfoService>();

            services.AddScoped<IStatusService, StatusService>();
            services.AddScoped<IDesignationSetupService, DesignationSetupService>();
            services.AddScoped<IEducationService, EducationService>();
            services.AddScoped<IAwardInfoService, AwardInfoService>();
            services.AddScoped<IDocumentService, DocumentService>();
            services.AddScoped<ICompanyInfoService, CompanyInfoService>();
            services.AddScoped<IBranchInfoService, BranchInfoService>();
            services.AddScoped<IAssetTypeService, AssetTypeService>();
            services.AddScoped<IAssetService, AssetService>();  
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<INewJobStatusService, NewJobStatusService>();
            services.AddScoped<IJobBaseStatusService, JobBaseStatusService>();
            services.AddScoped<IEducationGroupService, EducationGroupService>();
            services.AddScoped<IEducationTypeService, EducationTypeService>();
            services.AddScoped<IGenderService, GenderService>();
            services.AddScoped<IInstituteService, InstituteService>();
            services.AddScoped<IEmploymentCategoryService, EmploymentCategoryService>();
            services.AddScoped<IDocumentCategoryService, DocumentCategoryService>();
            services.AddScoped<IAwardTypeService, AwardTypeService>();
            services.AddScoped<IWarningService, WarningService>();
            services.AddScoped<IWorkflowMappingService, WorkflowMappingService>();
            services.AddScoped<IClaimTypeService, ClaimTypeService>();
            services.AddScoped<IOpeningYearService, OpeningYearService>();
            services.AddScoped<IGradeService, GradeService>();
            services.AddScoped<IWarningTypeService, WarningTypeService>();
            services.AddScoped<ISupervisorSetupService, SupervisorSetupService>();
            services.AddScoped<INewApprovalWorkflowService, NewApprovalWorkflowService>();
            services.AddScoped<ILeaveTypeService, LeaveTypeService>();
            services.AddScoped<IAwardInfoService, AwardInfoService>();
            services.AddScoped<IProficiencyService, ProficiencyService>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<IReligionService, ReligionService>();
            services.AddScoped<IJobStatusService, JobStatusService>();
            services.AddScoped<IStateService, StateService>();
            services.AddScoped<IHobbyTypeService, HobbyTypeService>();
            services.AddScoped<IDocumentTypeService, DocumentTypeService>();
        }
    }
}
