import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Employees } from 'src/app/feature/model/employees.model';
import { JobNewStatus } from 'src/app/feature/model/jobNewStatus.model';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { JobNewStatusService } from 'src/app/feature/service/job-new-status.service';

@Component({
  selector: 'app-job-new-status-create-update',
  templateUrl: './job-new-status-create-update.component.html',
  styleUrls: ['./job-new-status-create-update.component.scss']
})
export class JobNewStatusCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/jobnewstatus.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  jobNewStatusId: number;
  jobNewStatusForm: FormGroup;
  jobNewStatusFormValue: any;
  isEdit = false;
  jobNewStatus: JobNewStatus;
  employeeId: number;
  employees: Employees[];
  filteredEmployees: Employees[];

  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private employeesSubject: Subject<string> = new Subject<string>();
 
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["employeeId","effectedDate", "notificationDate", "remarks","action"];
  dataSource = new MatTableDataSource<JobNewStatus>();
  selection = new SelectionModel<JobNewStatus>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public jobNewStatusService: JobNewStatusService,
    public employeesService: EmployeesService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.jobNewStatusForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.jobNewStatusForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<JobNewStatus>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.jobNewStatusId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.jobNewStatusId;
    this.jobNewStatusForm = this.form;
    this.jobNewStatusForm.patchValue({id: this.jobNewStatusId});
    this.getJobNewStatusDetail(this.jobNewStatusId);
    this.getEmployee("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getEmployee(v)});
  }

  getJobNewStatusDetail(jobNewStatusId: any) {
    if (!this.jobNewStatusId) return;
    this.jobNewStatusService.getJobNewStatusDetail(jobNewStatusId).subscribe({
      next: (res: any) => {
        if (res) {
          this.jobNewStatus= res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  onEmployeeFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.employeesSubject.next(value);
  }

  getEmployee(searchText: string) {
    this.employeesService.getDropdown(0, 10, searchText).subscribe({
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
  

  get form(): any {
    return this.fb.group({
      id: [0], 
      userId: [1],
      employeeId: ["",[Validators.required]],
      statusType: [""],
      nextJobStatusType: ["", Validators.required],
      effectedDate: ["", [Validators.required]],
      notificationDate: ["", [Validators.required]],
      remarks: ["", Validators.required],
    
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.jobNewStatusForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        statusType: user.statusType,
        nextJobStatusType: user.nextJobStatusType,
        effectedDate: user.effectedDate,
        notificationDate: user.notificationDate,
        remarks: user.remarks,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.jobNewStatusForm);
    if (this.jobNewStatusForm.invalid) {
      this.jobNewStatusForm.markAllAsTouched();
      return;
    }

   
    this.jobNewStatusFormValue = this.jobNewStatusForm.getRawValue();
    this.formData = FormExtension.toFormData(this.jobNewStatusForm);
    console.log("save", this.jobNewStatusForm);

    if (this.jobNewStatusFormValue.id > 0) {

      this.jobNewStatusService.updateJobNewStatusDetail(this.jobNewStatusFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/jobNewStatus']);
        },
      });
    } else {
      this.jobNewStatusService.addJobNewStatusDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/jobNewStatus']);
        },
      });
    }
  }

  reset(): void {
    this.jobNewStatusForm.reset(this.form.value);
  }

  clearState(): void {
    this.jobNewStatusForm.reset();
    this.jobNewStatusForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.jobNewStatusForm);
  }
}
