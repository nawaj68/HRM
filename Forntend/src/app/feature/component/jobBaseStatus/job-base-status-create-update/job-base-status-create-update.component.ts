import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, Subject, debounceTime } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { BranchInfo } from 'src/app/feature/model/branchInfo.model';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { JobBaseStatus } from 'src/app/feature/model/configurations/jobbasestatus.model';

import { Project } from 'src/app/feature/model/project.model';
import { BranchInfoService } from 'src/app/feature/service/branch-info.service';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { JobBaseStatusService } from 'src/app/feature/service/configurations/job-base-status.service';

import { ProjectService } from 'src/app/feature/service/project.service';

@Component({
  selector: 'app-job-base-status-create-update',
  templateUrl: './job-base-status-create-update.component.html',
  styleUrls: ['./job-base-status-create-update.component.scss']
})
export class JobBaseStatusCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/jobbasestatus.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  jobbasestatusId: number;
  jobbasestatusForm: FormGroup;
  jobbasestatusFormValue: any;
  isEdit = false;
  jobbasestatus: JobBaseStatus;
  companyId: number;
  branchId: number;
  projectId: number;
  company: CompanyInfo[];
  branch: BranchInfo[];
  project: Project[];
  relatedPosts = [];
  today = new Date();

  filteredcompany: CompanyInfo[];
  filteredbranch: BranchInfo[];
  filteredproject: Project[];
  deptCtrl = new FormControl();

  private companySubject: Subject<string> = new Subject<string>();
  private branchSubject: Subject<string> = new Subject<string>();
  private projectSubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  
  tomorrow = new Date();
  
  displayedColumns: string[] = ["companyId","jobBaseStatusCode","jobBaseStatusTitle","projectId","action"];
  dataSource = new MatTableDataSource<JobBaseStatus>();
  selection = new SelectionModel<JobBaseStatus>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor( private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public jobbasestatusService: JobBaseStatusService,
    public companyinfoService: CompanyinfoService,
    public branchService: BranchInfoService,
    public projectService: ProjectService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.jobbasestatusForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.jobbasestatusForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<JobBaseStatus>(e);
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.jobbasestatusId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.jobbasestatusId;
    this.jobbasestatusForm = this.form;
    this.jobbasestatusForm.patchValue({id: this.jobbasestatusId});
    this.getJobbasestatusDetail(this.jobbasestatusId);
    this.getCompany("");
    this.getbranch("");
    this.getproject("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
    this.branchSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getbranch(v)});
    this.projectSubject.pipe(debounceTime(1000)).subscribe({next:(v:string) => this.getproject(v)});
  }
  getJobbasestatusDetail(jobbasestatusId: any) {
    if (!this.jobbasestatusId) return;
    this.jobbasestatusService.getJobbasestatusDetail(jobbasestatusId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.jobbasestatus = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  getCompany(searchText: string) {
    this.companyinfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.company = res.data.data;
          this.filteredcompany = res.data.data;
        }
      },
    });
  }
  getbranch(searchText: string) {
    this.branchService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.branch = res.data.data;
          this.filteredbranch = res.data.data;
        }
      },
    });
  }

  getproject(searchText: string) {
    this.projectService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.project = res.data.data;
          this.filteredproject = res.data.data;
        }
      },
    });
  }
  get form(): any {
    return this.fb.group({
      id: [0], 
      companyId: [null],
      branchId: [null],
      projectId: [null],
      jobBaseStatusCode: [null],
      jobBaseStatusTitle: [null]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.jobbasestatusForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        branchId: user.branchId,
        projectId: user.projectId,
        jobBaseStatusCode:user.jobBaseStatusCode,
        jobBaseStatusTitle:user.jobBaseStatusTitle
       
      });
    }
  }
  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  onBranchFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.branchSubject.next(value);
  }
  onProjectFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.projectSubject.next(value);
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.jobbasestatusForm);
    if (this.jobbasestatusForm.invalid) {
      this.jobbasestatusForm.markAllAsTouched();
      return;
    }

    this.jobbasestatusFormValue = this.jobbasestatusForm.getRawValue();
    this.formData = FormExtension.toFormData(this.jobbasestatusForm);
    console.log("save", this.jobbasestatusFormValue);

    debugger;
    if (this.jobbasestatusFormValue.id > 0) {
      this.jobbasestatusService.updateJobbasestatusDetail(this.jobbasestatusFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['jobbasestatus']);
        },
      });
    } else {
      this.jobbasestatusService.addJobbasestastusDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['jobbasestatus']);
        },
      });
    }
  }
  reset(): void {
    this.jobbasestatusForm.reset(this.form.value);
  }
  clearState(): void {
    this.jobbasestatusForm.reset();
    this.jobbasestatusForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.jobbasestatusForm);
  }

}
