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
import { Newjobstatus } from 'src/app/feature/model/configurations/newjobstatus.model';

import { Project } from 'src/app/feature/model/project.model';
import { BranchInfoService } from 'src/app/feature/service/branch-info.service';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { NewjobstatusService } from 'src/app/feature/service/configurations/newjobstatus.service';

import { ProjectService } from 'src/app/feature/service/project.service';

@Component({
  selector: 'app-newjobstatus-create-edit',
  templateUrl: './newjobstatus-create-edit.component.html',
  styleUrls: ['./newjobstatus-create-edit.component.scss']
})
export class NewjobstatusCreateEditComponent implements OnInit {

  jsonUrl = "assets/data/newjobstatus.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  newjobstatusId: number;
  newjobstatusForm: FormGroup;
  newjobstatusFormValue: any;
  isEdit = false;
  newjobstatus: Newjobstatus;
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
  
  displayedColumns: string[] = ["companyId","statusCode","statusTitle","projectId","action"];
  dataSource = new MatTableDataSource<Newjobstatus>();
  selection = new SelectionModel<Newjobstatus>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public newjobstatusService: NewjobstatusService,
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
      this.newjobstatusForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.newjobstatusForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<Newjobstatus>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.newjobstatusId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.newjobstatusId;
    this.newjobstatusForm = this.form;
    this.newjobstatusForm.patchValue({id: this.newjobstatusId});
    this.getNewjobstatusDetail(this.newjobstatusId);
    this.getCompany("");
    this.getbranch("");
    this.getproject("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
    this.branchSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getbranch(v)});
    this.projectSubject.pipe(debounceTime(1000)).subscribe({next:(v:string) => this.getproject(v)});
  }
  getNewjobstatusDetail(assetId: any) {
    if (!this.newjobstatusId) return;
    this.newjobstatusService.getNewjobstatusDetail(assetId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.newjobstatus = res.data;
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
      statusCode: [null],
      statusTitle: [null]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.newjobstatusForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        branchId: user.branchId,
        projectId: user.projectId,
        statusCode:user.statusCode,
        statusTitle:user.statusTitle
       
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
    this.errors = FormExtension.getFormValidationErrors(this.newjobstatusForm);
    if (this.newjobstatusForm.invalid) {
      this.newjobstatusForm.markAllAsTouched();
      return;
    }

    this.newjobstatusFormValue = this.newjobstatusForm.getRawValue();
    this.formData = FormExtension.toFormData(this.newjobstatusForm);
    console.log("save", this.newjobstatusFormValue);

    debugger;
    if (this.newjobstatusFormValue.id > 0) {
      this.newjobstatusService.updateNewjobstatusDetail(this.newjobstatusFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['newjobstatus']);
        },
      });
    } else {
      this.newjobstatusService.addNewjobststusDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['newjobstatus']);
        },
      });
    }
  }
  reset(): void {
    this.newjobstatusForm.reset(this.form.value);
  }
  clearState(): void {
    this.newjobstatusForm.reset();
    this.newjobstatusForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.newjobstatusForm);
  }
}
