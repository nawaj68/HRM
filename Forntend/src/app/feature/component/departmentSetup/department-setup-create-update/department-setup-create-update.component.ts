import { SelectionModel } from '@angular/cdk/collections';
import { U } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
import { Department } from 'src/app/feature/model/configurations/department.model';
import { DepartmentSetup } from 'src/app/feature/model/departmentSetup.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { DepartmentService } from 'src/app/feature/service/configurations/department.service';
import { DepartmentSetupService } from 'src/app/feature/service/department-setup.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';


@Component({
  selector: 'app-department-setup-create-update',
  templateUrl: './department-setup-create-update.component.html',
  styleUrls: ['./department-setup-create-update.component.scss']
})
export class DepartmentSetupCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  departmentSetup: DepartmentSetup;

  userId: number;
  departmentSetupId:number;
  departmentSetupForm:FormGroup;
  departmentSetupFormValue:any;

  employees:Employees[];
  filteredEmployees:Employees[];

  departments:Department[];
  filteredDepartments:Department[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private departmentSubjet: Subject<string> = new Subject<string>();


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  // displayedColumns: string[] = ["departmentSetupName", "action"];
  dataSource = new MatTableDataSource<DepartmentSetup>();
  selection = new SelectionModel<DepartmentSetup>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public departmentSetupService: DepartmentSetupService,
    public departmentService: DepartmentService,
    public employeeService: EmployeesService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.departmentSetupId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.departmentSetupId;
    this.departmentSetupForm = this.form;
    this.departmentSetupForm.patchValue({id: this.departmentSetupId});    
    this.getDepartmentSetupDetail(this.departmentSetupId);
    this.getEmployees("");
    this.getDepartment("")
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.departmentSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getDepartment(v) });
  }

  getEmployees(searchText: string){
    this.employeeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredEmployees = res.data.data;
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
  getDepartment(searchText: string){
    this.departmentService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredDepartments = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  
  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
  onDepartmentFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeeSubjet.next(value);
  }
  getDepartmentSetupDetail(departmentSetupId: any) {
    if (!this.departmentSetupId) return;
    this.departmentSetupService.getDepartmentSetupDetail(departmentSetupId).subscribe({
      next: (res: any) => {
        if (res) {
          this.departmentSetup = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [3],
      employeeId:[],
      departmentId:[],
      effectedDate:["",[Validators.required]],
      remark:["",[Validators.required]]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.departmentSetupForm.patchValue({
        id: user.id,
        userId: 3,//user.userId,
        employeeId:user.employeeId,
        departmentId:user.departmentId,
        effectedDate:user.effectedDate,
        remark:user.remark
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.departmentSetupForm);
    if (this.departmentSetupForm.invalid) {
      this.departmentSetupForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.departmentSetupFormValue = this.departmentSetupForm.getRawValue();
    this.formData = FormExtension.toFormData(this.departmentSetupForm);
    console.log("save", this.departmentSetupFormValue);

    debugger;
    if (this.departmentSetupFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.departmentSetupService.updateDepartmentSetupDetail(this.departmentSetupFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['departmentSetup']);
        },
      });
    } else {
      this.departmentSetupService.addDepartmentSetupDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['departmentSetup']);
        },
      });
    }
  }

  reset(): void {
    this.departmentSetupForm.reset(this.form.value);
  }

  clearState(): void {
    this.departmentSetupForm.reset();
    this.departmentSetupForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.departmentSetupForm);
  }
}
