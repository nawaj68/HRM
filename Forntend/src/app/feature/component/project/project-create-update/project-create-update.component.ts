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
import { distinctUntilChanged, Subject, debounceTime } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { BranchInfo } from 'src/app/feature/model/branchInfo.model';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { Project } from 'src/app/feature/model/project.model';
import { BranchInfoService } from 'src/app/feature/service/branch-info.service';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { ProjectService } from 'src/app/feature/service/project.service';

@Component({
  selector: 'app-project-create-update',
  templateUrl: './project-create-update.component.html',
  styleUrls: ['./project-create-update.component.scss']
})
export class ProjectCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/project.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  projectId: number;
  projectForm: FormGroup;
  projectFormValue: any;
  isEdit = false;
  project: Project;
  //branches: any;
  companyId: number;
  branchId: number;
  company: CompanyInfo[];
  branch: BranchInfo[];
  //filterBranches: any;
  relatedPosts = [];
  //status: [];
  today = new Date();

  filteredcompany: CompanyInfo[];
  filteredbranch: BranchInfo[];
  deptCtrl = new FormControl();

  private companySubject: Subject<string> = new Subject<string>();
  private branchSubject: Subject<string> = new Subject<string>();
  // public uploader: FileUploader;
  // uploadUrl: string;
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  
  tomorrow = new Date();
  
  displayedColumns: string[] = ["projectName","projectDescription","duration","action"];
  dataSource = new MatTableDataSource<Project>();
  selection = new SelectionModel<Project>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public projectService: ProjectService,
    public companyinfoService: CompanyinfoService,
    public branchinfoService: BranchInfoService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.projectForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.projectForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Project>(e);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.projectId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.projectId;
    //this.filterBranches = this.branches;
    this.projectForm = this.form;
    this.projectForm.patchValue({id: this.projectId});
    this.getProjectDetail(this.projectId);
    //this.uploader = new FileUploader({});
    this.getCompany("");
    this.getBranch("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
    this.branchSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getBranch(v)});
  }
  getProjectDetail(projectId: any) {
    if (!this.projectId) return;
    this.projectService.getProjectDetail(projectId).subscribe({
      next: (res: any) => {
        if (res) {
          this.project = res.data;
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
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  getBranch(searchText: string) {
    this.branchinfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.branch = res.data.data;
          this.filteredbranch = res.data.data;
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
      projectName: ["", [Validators.required, Validators.maxLength(50)]],
      projectDescription:[""],
      duration:[],
      companyId: [null],
      branchId: [null],
      startDate: [null],
      endDate: [null]

    });
  }
  set form(user: any) {
    if (user !== null) {
      this.projectForm.patchValue({
        id: user.id,
       // userId: 1,
        userId: user.userId,
        projectName: user.projectName,
        projectDescription: user.projectDescription,
        duration:user.duration,
        companyId:user.companyId,
        branchId: user.branchId,
        startDate:user.startDate,
        endDate:user.endDate
      });

      // this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      // this.avatar = user.avatar;
      // console.log("path avater", this.avatar);
      // console.log("path", user, this.assettypeForm.getRawValue());
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
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.projectForm);
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.projectFormValue = this.projectForm.getRawValue();
    //console.log("save avater", this.avatar);
    //this.assettypeForm.patchValue({avatar: this.avatar});
    this.formData = FormExtension.toFormData(this.projectForm);
    console.log("save", this.projectFormValue);

    debugger;
    if (this.projectFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.projectService.updateProjectDetail(this.projectFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['project']);
        },
      });
    } else {
      this.projectService.addProjectDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['project']);
        },
      });
    }
  }
  reset(): void {
    this.projectForm.reset(this.form.value);
  }
  clearState(): void {
    this.projectForm.reset();
    this.projectForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.projectForm);
  }
}
