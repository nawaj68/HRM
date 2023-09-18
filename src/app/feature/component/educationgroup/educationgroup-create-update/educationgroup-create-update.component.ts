import { SelectionModel } from "@angular/cdk/collections";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatAutocomplete } from "@angular/material/autocomplete";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import { FormExtension } from "src/app/core/form/form-extension";
import { DataPassService } from "src/app/core/services/data-pass.service";
import { MessageService } from "src/app/core/services/message/message.service";
import { Messages } from "src/app/core/services/message/messages";
import { CompanyInfo } from "src/app/feature/model/companyinfo.model";
import { EducationGroup } from "src/app/feature/model/configurations/educationgroup.model";
import { CompanyinfoService } from "src/app/feature/service/companyinfo.service";
import { EducationgroupService } from "src/app/feature/service/configurations/educationgroup.service";



@Component({
  selector: 'app-educationgroup-create-update',
  templateUrl: './educationgroup-create-update.component.html',
  styleUrls: ['./educationgroup-create-update.component.scss']
})
export class EducationgroupCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/educationgroup.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  educationgroupId: number;
  educationgroupForm: FormGroup;
  educationgroupFormValue: any;
  isEdit = false;
  educationgroup: EducationGroup;
  companyId: number;
  company: CompanyInfo[];
  relatedPosts = [];
  today = new Date();

  filteredcompany: CompanyInfo[];
  deptCtrl = new FormControl();

  private companySubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  
  tomorrow = new Date();
  
  displayedColumns: string[] = ["companyInfo","educationGroupName","status","action"];
  dataSource = new MatTableDataSource<EducationGroup>();
  selection = new SelectionModel<EducationGroup>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public educationgroupService: EducationgroupService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.educationgroupForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.educationgroupForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<EducationGroup>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.educationgroupId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.educationgroupId;
    this.educationgroupForm = this.form;
    this.educationgroupForm.patchValue({id: this.educationgroupId});
    this.getEducationgroupDetail(this.educationgroupId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getEducationgroupDetail(educationgroupId: any) {
    if (!this.educationgroupId) return;
    this.educationgroupService.getEducationgroupDetail(educationgroupId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.educationgroup = res.data;
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
  get form(): any {
    return this.fb.group({
      id: [0], 
      companyId: [null],
      educationGroupName: ["",[Validators.required,Validators.maxLength(20)]],
      status: [false]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.educationgroupForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        educationGroupName:user.educationGroupName,
        status:user.status
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.educationgroupForm);
    if (this.educationgroupForm.invalid) {
      this.educationgroupForm.markAllAsTouched();
      return;
    }

    this.educationgroupFormValue = this.educationgroupForm.getRawValue();
    this.formData = FormExtension.toFormData(this.educationgroupForm);
    console.log("save", this.educationgroupFormValue);

    debugger;
    if (this.educationgroupFormValue.id > 0) {
      this.educationgroupService.updateEducationgroupDetail(this.educationgroupFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['educationgroup']);
        },
      });
    } else {
      this.educationgroupService.addEducationgroupDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['educationgroup']);
        },
      });
    }
  }
  reset(): void {
    this.educationgroupForm.reset(this.form.value);
  }
  clearState(): void {
    this.educationgroupForm.reset();
    this.educationgroupForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.educationgroupForm);
  }

}
