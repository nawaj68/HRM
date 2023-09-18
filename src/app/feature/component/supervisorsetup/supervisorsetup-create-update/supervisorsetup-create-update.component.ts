import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { SupervisorSetup } from 'src/app/feature/model/supervisorsetup';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { SupervisorsetupService } from 'src/app/feature/service/supervisorsetup.service';

@Component({
  selector: 'app-supervisorsetup-create-update',
  templateUrl: './supervisorsetup-create-update.component.html',
  styleUrls: ['./supervisorsetup-create-update.component.scss']
})
export class SupervisorsetupCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  supervisorSetupId: number;
  supervisorSetupForm: FormGroup;
  supervisorSetupFormValue: any;
  isEdit = false;
  supervisorSetup: SupervisorSetup;

  employees:Employees[];
  filteredemployees:Employees[];

  companyInfo:CompanyInfo[];
  filteredCompanyInfo:CompanyInfo[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private companyInfoSubjet: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["employeeId", "companyId", "action"];

  dataSource = new MatTableDataSource<SupervisorSetup>();
  selection = new SelectionModel<SupervisorSetup>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public supervisorsetupService: SupervisorsetupService,
    public employeeService:EmployeesService,
    public companyinfoService: CompanyinfoService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.supervisorSetupId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.supervisorSetupId;
    this.supervisorSetupForm = this.form;
    this.supervisorSetupForm.patchValue({ id: this.supervisorSetupId });
    this.getSupervisorSetupDetail(this.supervisorSetupId);
    this.getEmployees("");
    this.getCompanySetup("");
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.companyInfoSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getCompanySetup(v) });
  }

  getSupervisorSetupDetail(supervisorSetupId: any) {
    if (!this.supervisorSetupId) return;
    this.supervisorsetupService.getSupervisorSetupDetail(supervisorSetupId).subscribe({
      next: (res: any) => {
        if (res) {
          this.supervisorSetup = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getEmployees(searchText: string){
    this.employeeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredemployees = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });

  }
  onEmployeeFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeeSubjet.next(value);
  }

  getCompanySetup(searchText: string){
    this.companyinfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.companyInfo = res.data.data;
          this.filteredCompanyInfo = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  onCompanyInfoFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companyInfoSubjet.next(value);
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      //userId: [3],
      employeeId: [],
      companyId: []
    });
  }

  set form(supervisorsetup: any) {
    if (supervisorsetup !== null) {
      this.supervisorSetupForm.patchValue({
        id: supervisorsetup.id,
        //userId: 3,//user.userId,
        employeeId: supervisorsetup.employeeId,
        companyId: supervisorsetup.companyId

      });

      // this.avaterPreview = user.avatar ? `${environment.baseUrl+"/images/profiles"}/${user.avatar}` : "";
      // this.avatar = user.avatar;
      // console.log("path avater", this.avatar);
      // console.log("path", user, this.awardInfoForm.getRawValue());
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.supervisorSetupForm);
    if (this.supervisorSetupForm.invalid) {
      this.supervisorSetupForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.supervisorSetupFormValue = this.supervisorSetupForm.getRawValue();
    // console.log("save avater", this.avatar);
    // this.supervisorSetupForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.supervisorSetupForm);
    console.log("save", this.supervisorSetupFormValue);

    debugger;
    if (this.supervisorSetupFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.supervisorsetupService.updateSupervisorSetupDetail(this.supervisorSetupFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['supervisorsetup']);
        },
      });
    } else {
      this.supervisorsetupService.addSupervisorSetupDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['supervisorsetup']);
        },
      });
    }
  }

  reset(): void {
    this.supervisorSetupForm.reset(this.form.value);
  }

  clearState(): void {
    this.supervisorSetupForm.reset();
    this.supervisorSetupForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.supervisorSetupForm);
  }

  



}
