import { CoreModule } from './core/core.module';
import { UserInformationCreateUpdateComponent } from './feature/component/user-information/user-information-create-update/user-information-create-update.component';
import { UserInformationListComponent } from './feature/component/user-information/user-information-list/user-information-list.component';
import { HttpRequestInterceptor } from './core/interceptors/http-request.interceptor';
import { EnrolleViewComponent } from "./feature/component/enrollee/enrolle-view/enrolle-view.component";
import { EnrolleEntryComponent } from "./feature/component/enrollee/enrolle-entry/enrolle-entry.component";
import { ModalFormComponent } from "./feature/component/modal-form/modal-form.component";
import { GridFormComponent } from "./feature/component/grid-form/grid-form.component";
import { BasicFormComponent } from "./feature/component/basic-form/basic-form.component";
import { CommonModule } from "@angular/common";
import { PageNotFoundComponent } from "./feature/component/PageNotFound/PageNotFound.component";
import { UserFormComponent } from "./feature/component/user-form/user-form.component";
import { MegaMenuComponent } from "./shared/components/mega-menu/mega-menu.component";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { ReactiveFormsModule } from "@angular/forms";
import { NavService } from "./shared/services/nav.service";
import { LoginFormComponent } from "./feature/component/login-form/login-form.component";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { FileUploadModule } from "ng2-file-upload";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { ModalFormCreateComponent } from "./feature/component/modal-form-create/modal-form-create.component";
import { EnrolleListComponent } from "./feature/component/enrollee/enrolle-list/enrolle-list.component";
import { EmployeesListComponent } from './feature/component/employees/employees-list/employees-list.component';
import { EmployeesCreateUpdateComponent } from './feature/component/employees/employees-create-update/employees-create-update.component';
import { BranchInfoListComponent } from './feature/component/branchInfo/branch-info-list/branch-info-list.component';
import { BranchInfoCreateUpdateComponent } from './feature/component/branchInfo/branch-info-create-update/branch-info-create-update.component';
import { ContactListComponent } from './feature/component/contact/contact-list/contact-list.component';
import { ContactCreateUpdateComponent } from './feature/component/contact/contact-create-update/contact-create-update.component';
import { CompanyinfoListComponent } from './feature/component/companyinfo/companyinfo-list/companyinfo-list.component';
import { CompanyinfoCreateUpdateComponent } from './feature/component/companyinfo/companyinfo-create-update/companyinfo-create-update.component';
import { FamilyInformationListComponent } from './feature/component/family-info/family-information-list/family-information-list.component';
import { FamilyInformationCreateUpdateComponent } from './feature/component/family-info/family-information-create-update/family-information-create-update.component';
import { WarningCreateUpdateComponent } from './feature/component/warning/warning-create-update/warning-create-update.component';
import { WarningListComponent } from './feature/component/warning/warning-list/warning-list.component';
import { AwardInfoListComponent } from './feature/component/award-Info/award-info-list/award-info-list.component';
import { AwardInfoCreateUpdateComponent } from './feature/component/award-Info/award-info-create-update/award-info-create-update.component';
import { BloodGroupListComponent } from './feature/component/configurations/bloodGroup/blood-group-list/blood-group-list.component';
import { BloodGroupCreateUpdateComponent } from './feature/component/configurations/bloodGroup/blood-group-create-update/blood-group-create-update.component';
import { AssettypeListComponent } from './feature/component/asset-type/assettype-list/assettype-list.component';
import { AssettypeCreateUpdateComponent } from './feature/component/asset-type/assettype-create-update/assettype-create-update.component';
import { ProjectListComponent } from './feature/component/project/project-list/project-list.component';
import { ProjectCreateUpdateComponent } from './feature/component/project/project-create-update/project-create-update.component';
import { GenderListComponent } from './feature/component/configurations/gender/gender-list/gender-list.component';
import { GenderCreateUpdateComponent } from './feature/component/configurations/gender/gender-create-update/gender-create-update.component';
import { PassportCreateUpdateComponent } from './feature/component/passport/passport-create-update/passport-create-update.component';
import { PassportListComponent } from './feature/component/passport/passport-list/passport-list.component';
import { CountryListComponent } from './feature/component/configurations/country/country-list/country-list.component';
import { CountryCreateUpdateComponent } from './feature/component/configurations/country/country-create-update/country-create-update.component';
import { FunctionaldesignationListComponent } from './feature/component/functionaldesignation/functionaldesignation-list/functionaldesignation-list.component';
import { FunctionaldesignationCreateUpdateComponent } from './feature/component/functionaldesignation/functionaldesignation-create-update/functionaldesignation-create-update.component';
import { StateListComponent } from './feature/component/configurations/state/state-list/state-list.component';
import { StateCreateUpdateComponent } from './feature/component/configurations/state/state-create-update/state-create-update.component';
import { CityListComponent } from './feature/component/configurations/city/city-list/city-list.component';
import { CityCreateUpdateComponent } from './feature/component/configurations/city/city-create-update/city-create-update.component';
import { AssetListComponent } from './feature/component/asset/asset-list/asset-list.component';
import { AssetCreateUpdateComponent } from './feature/component/asset/asset-create-update/asset-create-update.component';
import { NewjobstatusListComponent } from './feature/component/newjobstatus/newjobstatus-list/newjobstatus-list.component';
import { NewjobstatusCreateEditComponent } from './feature/component/newjobstatus/newjobstatus-create-edit/newjobstatus-create-edit.component';
import { MaritalStatusListComponent } from './feature/component/configurations/maritalStatus/marital-status-list/marital-status-list.component';
import { MaritalStatusCreateUpdateComponent } from './feature/component/configurations/maritalStatus/marital-status-create-update/marital-status-create-update.component';
import { AssetRequisitionCreateUpdateComponent } from './feature/component/asset-requisition/asset-requisition-create-update/asset-requisition-create-update.component';
import { AssetRequisitionListComponent } from './feature/component/asset-requisition/asset-requisition-list/asset-requisition-list.component';
import { BankInfoListComponent } from './feature/component/bankInfo/bank-info-list/bank-info-list.component';
import { BankInfoCreateUpdateComponent } from './feature/component/bankInfo/bank-info-create-update/bank-info-create-update.component';
import { DistributeAssetCreateUpdateComponent } from './feature/component/distribute-asset/distribute-asset-create-update/distribute-asset-create-update.component';
import { DistributeAssetListComponent } from './feature/component/distribute-asset/distribute-asset-list/distribute-asset-list.component';
import { SupervisorListComponent } from './feature/component/supervisor/supervisor-list/supervisor-list.component';
import { SupervisorCreateUpdateComponent } from './feature/component/supervisor/supervisor-create-update/supervisor-create-update.component';
import { ProficiencyListComponent } from './feature/component/configurations/proficiency/proficiency-list/proficiency-list.component';
import { ProficiencyCreateUpdateComponent } from './feature/component/configurations/proficiency/proficiency-create-update/proficiency-create-update.component';
import { DepartmentSetupListComponent } from './feature/component/departmentSetup/department-setup-list/department-setup-list.component';
import { DepartmentSetupCreateUpdateComponent } from './feature/component/departmentSetup/department-setup-create-update/department-setup-create-update.component';
import { DesignationSetupListComponent } from './feature/component/designationSetup/designation-setup-list/designation-setup-list.component';
import { DesignationSetupCreateUpdateComponent } from './feature/component/designationSetup/designation-setup-create-update/designation-setup-create-update.component';
import { SupervisorsetupListComponent } from './feature/component/supervisorsetup/supervisorsetup-list/supervisorsetup-list.component';
import { SupervisorsetupCreateUpdateComponent } from './feature/component/supervisorsetup/supervisorsetup-create-update/supervisorsetup-create-update.component';
import { LanguageListComponent } from './feature/component/language/language-list/language-list.component';
import { LanguageCreateUpdateComponent } from './feature/component/language/language-create-update/language-create-update.component';
import { DepartmentListComponent } from './feature/component/configurations/department/department-list/department-list.component';
import { DepartmentCreateUpdateComponent } from './feature/component/configurations/department/department-create-update/department-create-update.component';
import { DesignationListComponent } from './feature/component/configurations/designation/designation-list/designation-list.component';
import { DesignationCreateUpdateComponent } from './feature/component/configurations/designation/designation-create-update/designation-create-update.component';
import { JobNewStatusCreateUpdateComponent } from './feature/component/jobNewStatus/job-new-status-create-update/job-new-status-create-update.component';
import { JobNewStatusListComponent } from './feature/component/jobNewStatus/job-new-status-list/job-new-status-list.component';
import { LeaveTypeCreateUpdateComponent } from './feature/component/configurations/leaveType/leave-type-create-update/leave-type-create-update.component';
import { LeaveTypeListComponent } from './feature/component/configurations/leaveType/leave-type-list/leave-type-list.component';
import { ClaimTypeCreateUpdateComponent } from './feature/component/configurations/claimType/claim-type-create-update/claim-type-create-update.component';
import { ClaimTypeListComponent } from './feature/component/configurations/claimType/claim-type-list/claim-type-list.component';
import { JobBaseStatusListComponent } from './feature/component/jobBaseStatus/job-base-status-list/job-base-status-list.component';
import { JobBaseStatusCreateUpdateComponent } from './feature/component/jobBaseStatus/job-base-status-create-update/job-base-status-create-update.component';
import { EducationgroupListComponent } from './feature/component/educationgroup/educationgroup-list/educationgroup-list.component';
import { EducationgroupCreateUpdateComponent } from './feature/component/educationgroup/educationgroup-create-update/educationgroup-create-update.component';
import { EducationtypeListComponent } from './feature/component/educationtype/educationtype-list/educationtype-list.component';
import { EducationtypeCreateUpdateComponent } from './feature/component/educationtype/educationtype-create-update/educationtype-create-update.component';
import { GradeListComponent } from './feature/component/grade/grade-list/grade-list.component';
import { GradeCreateUpdateComponent } from './feature/component/grade/grade-create-update/grade-create-update.component';
import { InstituteListComponent } from './feature/component/institute/institute-list/institute-list.component';
import { InstituteCreateUpdateComponent } from './feature/component/institute/institute-create-update/institute-create-update.component';
import { EmploymentCategoryCreateUpdateComponent } from './feature/component/employmentCategory/employment-category-create-update/employment-category-create-update.component';
import { EmploymentCategoryListComponent } from './feature/component/employmentCategory/employment-category-list/employment-category-list.component';
import { DocumentCategoryListComponent } from './feature/component/documentCategory/document-category-list/document-category-list.component';
import { DocumentCategoryCreateUpdateComponent } from './feature/component/documentCategory/document-category-create-update/document-category-create-update.component';
import { AwardTypeListComponent } from './feature/component/awardType/award-type-list/award-type-list.component';
import { AwardTypeCreateUpdateComponent } from './feature/component/awardType/award-type-create-update/award-type-create-update.component';
import { ReligionListComponent } from './feature/component/configurations/religion/religion-list/religion-list.component';
import { ReligionCreateUpdateComponent } from './feature/component/configurations/religion/religion-create-update/religion-create-update.component';
import { JobStatusListComponent } from './feature/component/jobStatus/job-status-list/job-status-list.component';
import { JobStatusCreateUpdateComponent } from './feature/component/jobStatus/job-status-create-update/job-status-create-update.component';
import { StatusListComponent } from './feature/component/configurations/status/status-list/status-list.component';
import { StatusCreateUpdateComponent } from './feature/component/configurations/status/status-create-update/status-create-update.component';
import { WarningTypeCreateUpdateComponent } from './feature/component/configurations/warningType/warning-type-create-update/warning-type-create-update.component';
import { WarningTypeListComponent } from './feature/component/configurations/warningType/warning-type-list/warning-type-list.component';
import { NewApprovalWorkflowCreateUpdateComponent } from './feature/component/configurations/newApprovalWorkflow/new-approval-workflow-create-update/new-approval-workflow-create-update.component';
import { NewApprovalWorkflowListComponent } from './feature/component/configurations/newApprovalWorkflow/new-approval-workflow-list/new-approval-workflow-list.component';
import { OpeningYearCreateUpdateComponent } from './feature/component/configurations/openingYear/opening-year-create-update/opening-year-create-update.component';
import { OpeningYearListComponent } from './feature/component/configurations/openingYear/opening-year-list/opening-year-list.component';
import { EducationCreateUpdateComponent } from './feature/component/education/education-create-update/education-create-update.component';
import { EducationListComponent } from './feature/component/education/education-list/education-list.component';
import { DocumentListComponent } from './feature/component/document/document-list/document-list.component';
import { DocumentCreateUpdateComponent } from './feature/component/document/document-create-update/document-create-update.component';
import { EmployeeManagementCategoryCreateUpdateComponent } from './feature/component/employeeManagementCategory/employee-management-category-create-update/employee-management-category-create-update.component';
import { EmployeeManagementCategoryListComponent } from './feature/component/employeeManagementCategory/employee-management-category-list/employee-management-category-list.component';
import { HobbyTypeListComponent } from './feature/component/hobbyType/hobby-type-list/hobby-type-list.component';
import { HobbyTypeCreateUpdateComponent } from './feature/component/hobbyType/hobby-type-create-update/hobby-type-create-update.component';
import { DocumentTypeListComponent } from './feature/component/documentType/document-type-list/document-type-list.component';
import { DocumentTypeCreateUpdateComponent } from './feature/component/documentType/document-type-create-update/document-type-create-update.component';


@NgModule({
  declarations: [
    AppComponent,
    MegaMenuComponent,
    UserFormComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    BasicFormComponent,
    GridFormComponent,
    ModalFormComponent,
    ModalFormCreateComponent,
    EnrolleEntryComponent,
    EnrolleListComponent,
    EnrolleViewComponent,
    UserInformationListComponent,
    UserInformationCreateUpdateComponent,
    EmployeesListComponent,
    EmployeesCreateUpdateComponent,
    BranchInfoListComponent,
    BranchInfoCreateUpdateComponent,
    ContactListComponent,
    ContactCreateUpdateComponent,
    CompanyinfoListComponent,
    CompanyinfoCreateUpdateComponent,
    FamilyInformationListComponent,
    FamilyInformationCreateUpdateComponent,
    WarningListComponent,
    WarningCreateUpdateComponent,
    AwardInfoListComponent,
    AwardInfoCreateUpdateComponent,
    BloodGroupListComponent,
    BloodGroupCreateUpdateComponent,
    AssettypeListComponent,
    AssettypeCreateUpdateComponent,
    ProjectListComponent,
    ProjectCreateUpdateComponent,
    GenderListComponent,
    GenderCreateUpdateComponent,
    PassportCreateUpdateComponent,
    PassportListComponent,
    CountryListComponent,
    CountryCreateUpdateComponent,
    FunctionaldesignationListComponent,
    FunctionaldesignationCreateUpdateComponent,
    CountryCreateUpdateComponent,
    StateListComponent,
    StateCreateUpdateComponent,
    CityListComponent,
    CityCreateUpdateComponent,
    MaritalStatusListComponent,
    MaritalStatusCreateUpdateComponent,
    ProjectCreateUpdateComponent,
    AssetListComponent,
    AssetCreateUpdateComponent,
    NewjobstatusListComponent,
    NewjobstatusCreateEditComponent,
    MaritalStatusListComponent,
    MaritalStatusCreateUpdateComponent,
    AssetRequisitionCreateUpdateComponent,
    AssetRequisitionListComponent,
    DistributeAssetCreateUpdateComponent,
    DistributeAssetListComponent,
    SupervisorListComponent,
    SupervisorCreateUpdateComponent,
    ProficiencyListComponent,
    ProficiencyCreateUpdateComponent,    
    JobNewStatusCreateUpdateComponent,
    JobNewStatusListComponent,
    BankInfoListComponent,
    BankInfoCreateUpdateComponent,
    DepartmentSetupListComponent,
    DepartmentSetupCreateUpdateComponent,
    DesignationSetupListComponent,
    DesignationSetupCreateUpdateComponent,
    LanguageListComponent,
    LanguageCreateUpdateComponent,
    DepartmentListComponent,
    DepartmentCreateUpdateComponent,
    DesignationListComponent,
    DesignationCreateUpdateComponent,
    LeaveTypeCreateUpdateComponent,
    LeaveTypeListComponent,
    ClaimTypeCreateUpdateComponent,
    ClaimTypeListComponent,
    NewjobstatusCreateEditComponent,
    JobBaseStatusListComponent,
    JobBaseStatusCreateUpdateComponent,
    EducationgroupListComponent,
    EmployeesCreateUpdateComponent,
    EducationgroupListComponent,
    EducationgroupCreateUpdateComponent,
    EducationtypeListComponent,
    EducationgroupCreateUpdateComponent,
    EducationtypeListComponent,
    EducationtypeCreateUpdateComponent,
    GradeListComponent,
    GradeCreateUpdateComponent,
    InstituteListComponent,
    InstituteCreateUpdateComponent,
    EmploymentCategoryCreateUpdateComponent,
    EmploymentCategoryListComponent,
    DocumentCategoryListComponent,
    DocumentCategoryCreateUpdateComponent,
    AwardTypeListComponent,
    AwardTypeCreateUpdateComponent,

    ReligionListComponent,
    ReligionCreateUpdateComponent,
    SupervisorsetupListComponent,
    SupervisorsetupCreateUpdateComponent,
    JobStatusListComponent,
    JobStatusCreateUpdateComponent,
    StatusListComponent,
    StatusCreateUpdateComponent,
    WarningTypeCreateUpdateComponent,
    WarningTypeListComponent,
    NewApprovalWorkflowCreateUpdateComponent,
    NewApprovalWorkflowListComponent,
    OpeningYearCreateUpdateComponent,
    OpeningYearListComponent,
    EducationCreateUpdateComponent,
    EducationListComponent,

    DocumentListComponent,
    DocumentCreateUpdateComponent,

    EmployeeManagementCategoryCreateUpdateComponent,
    EmployeeManagementCategoryListComponent,

    HobbyTypeListComponent,
    HobbyTypeCreateUpdateComponent,

    DocumentTypeListComponent,
    DocumentTypeCreateUpdateComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    LoadingBarRouterModule,
    BrowserAnimationsModule,
    SharedModule,
    SweetAlert2Module,
    FileUploadModule,
    HttpClientModule,
    CoreModule,

  ],
  providers: [NavService, { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [ModalFormCreateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }


