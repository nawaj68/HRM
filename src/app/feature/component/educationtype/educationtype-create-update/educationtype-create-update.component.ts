import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { EducationType } from 'src/app/feature/model/configurations/educationtype.model';

import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { EducationtypeService } from 'src/app/feature/service/configurations/educationtype.service';


@Component({
  selector: 'app-educationtype-create-update',
  templateUrl: './educationtype-create-update.component.html',
  styleUrls: ['./educationtype-create-update.component.scss']
})
export class EducationtypeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/educationgroup.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  educationtypeId: number;
  educationtypeForm: FormGroup;
  educationtypeFormValue: any;
  isEdit = false;
  educationtype: EducationType;
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
  
  displayedColumns: string[] = ["companyInfo","educationTypeName","status","action"];
  dataSource = new MatTableDataSource<EducationType>();
  selection = new SelectionModel<EducationType>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public educationtypeService: EducationtypeService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.educationtypeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.educationtypeForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<EducationType>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.educationtypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.educationtypeId;
    this.educationtypeForm = this.form;
    this.educationtypeForm.patchValue({id: this.educationtypeId});
    this.getEducationtypeDetail(this.educationtypeId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getEducationtypeDetail(educationtypeId: any) {
    if (!this.educationtypeId) return;
    this.educationtypeService.getEducationtypeDetail(educationtypeId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.educationtype = res.data;
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
      educationTypeName: ["",[Validators.required,Validators.maxLength(20)]],
      status: [false]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.educationtypeForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        educationTypeName:user.educationTypeName,
        status:user.status
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.educationtypeForm);
    if (this.educationtypeForm.invalid) {
      this.educationtypeForm.markAllAsTouched();
      return;
    }

    this.educationtypeFormValue = this.educationtypeForm.getRawValue();
    this.formData = FormExtension.toFormData(this.educationtypeForm);
    console.log("save", this.educationtypeFormValue);

    debugger;
    if (this.educationtypeFormValue.id > 0) {
      this.educationtypeService.updateEducationTypeDetail(this.educationtypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['educationtype']);
        },
      });
    } else {
      this.educationtypeService.addEducationTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['educationtype']);
        },
      });
    }
  }
  reset(): void {
    this.educationtypeForm.reset(this.form.value);
  }
  clearState(): void {
    this.educationtypeForm.reset();
    this.educationtypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.educationtypeForm);
  }

}
