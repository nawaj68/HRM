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
import { Status } from 'src/app/feature/model/configurations/status.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { JobStatus } from 'src/app/feature/model/jobStatus.model';
import { StatusService } from 'src/app/feature/service/configurations/status.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { JobStatusService } from 'src/app/feature/service/job-status.service';

@Component({
  selector: 'app-job-status-create-update',
  templateUrl: './job-status-create-update.component.html',
  styleUrls: ['./job-status-create-update.component.scss']
})
export class JobStatusCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  jobstatus: JobStatus;

  userId: number;
  jobstatusId:number;
  jobstatusForm:FormGroup;
  jobstatusFormValue:any;

  employees:Employees[];
  filteredEmployees:Employees[];

  statuses:Status[];
  filteredStatus:Status[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private statusSubjet: Subject<string> = new Subject<string>();


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  // displayedColumns: string[] = ["jobstatusName", "action"];
  dataSource = new MatTableDataSource<JobStatus>();
  selection = new SelectionModel<JobStatus>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public jobstatusService: JobStatusService,
    public employeeService: EmployeesService,
    public statusService: StatusService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.jobstatusId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.jobstatusId;
    this.jobstatusForm = this.form;
    this.jobstatusForm.patchValue({id: this.jobstatusId});    
    this.getJobStatusDetail(this.jobstatusId);
    this.getEmployees("");
    this.getStatus("")
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.statusSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getStatus(v) });
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

  getStatus(searchText: string){
    this.statusService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.statuses = res.data.data;
          this.filteredStatus = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onStatusFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.statusSubjet.next(value);
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }


  getJobStatusDetail(jobstatusId: any) {
    if (!this.jobstatusId) return;
    this.jobstatusService.getJobStatusDetail(jobstatusId).subscribe({
      next: (res: any) => {
        if (res) {
          this.jobstatus = res.data;
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
      statusId:[],
      effectedDate:["",[Validators.required]],
      remark:["",[Validators.required]]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.jobstatusForm.patchValue({
        id: user.id,
        userId: 3,//user.userId,
        employeeId:user.employeeId,
        statusId:user.statusId,
        effectedDate:user.effectedDate,
        remark:user.remark
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.jobstatusForm);
    if (this.jobstatusForm.invalid) {
      this.jobstatusForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.jobstatusFormValue = this.jobstatusForm.getRawValue();
    this.formData = FormExtension.toFormData(this.jobstatusForm);
    console.log("save", this.jobstatusFormValue);

    debugger;
    if (this.jobstatusFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.jobstatusService.updateJobStatusDetail(this.jobstatusFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['jobStatus']);
        },
      });
    } else {
      this.jobstatusService.addJobStatusDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['jobStatus']);
        },
      });
    }
  }

  reset(): void {
    this.jobstatusForm.reset(this.form.value);
  }

  clearState(): void {
    this.jobstatusForm.reset();
    this.jobstatusForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.jobstatusForm);
  }
}
