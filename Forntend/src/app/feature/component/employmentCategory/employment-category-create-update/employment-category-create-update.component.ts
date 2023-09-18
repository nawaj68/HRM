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
import { FrontRoute } from 'src/app/feature/configs/front-route';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { EmploymentcategoryService } from 'src/app/feature/service/configurations/employmentcategory.service';

import { EmploymentCategory } from '../../../model/configurations/employmentCategory.model';

@Component({
  selector: 'app-employment-category-create-update',
  templateUrl: './employment-category-create-update.component.html',
  styleUrls: ['./employment-category-create-update.component.scss']
})
export class EmploymentCategoryCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/employmentCategory.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  employmentCategoryId: number;
  employmentCategoryForm: FormGroup;
  employmentCategoryFormValue: any;
  isEdit = false;
  employmentCategory: EmploymentCategory;
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
  
  displayedColumns: string[] = ["companyInfo","categoryName","status","action"];
  dataSource = new MatTableDataSource<EmploymentCategory>();
  selection = new SelectionModel<EmploymentCategory>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public employmentCategoryService: EmploymentcategoryService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.employmentCategoryForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.employmentCategoryForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<EmploymentCategory>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.employmentCategoryId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.employmentCategoryId;
    this.employmentCategoryForm = this.form;
    this.employmentCategoryForm.patchValue({id: this.employmentCategoryId});
    this.getEducationtypeDetail(this.employmentCategoryId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getEducationtypeDetail(employmentCategoryId: any) {
    if (!this.employmentCategoryId) return;
    this.employmentCategoryService.getEmploymentCategoryDetail(employmentCategoryId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.employmentCategory= res.data;
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
      categoryName: ["",[Validators.required,Validators.maxLength(20)]],
      status: [false]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.employmentCategoryForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        categoryName:user.categoryName,
        status:user.status
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.employmentCategoryForm);
    if (this.employmentCategoryForm.invalid) {
      this.employmentCategoryForm.markAllAsTouched();
      return;
    }

    this.employmentCategoryFormValue = this.employmentCategoryForm.getRawValue();
    this.formData = FormExtension.toFormData(this.employmentCategoryForm);
    console.log("save", this.employmentCategoryFormValue);

    debugger;
    if (this.employmentCategoryFormValue.id > 0) {
      this.employmentCategoryService.updateEmploymentCategoryDetail(this.employmentCategoryFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['employmentCategory']);
        },
      });
    } else {
      this.employmentCategoryService.addEmploymentCategoryDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['employmentCategory']);
        },
      });
    }
  }
  reset(): void {
    this.employmentCategoryForm.reset(this.form.value);
  }
  clearState(): void {
    this.employmentCategoryForm.reset();
    this.employmentCategoryForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.employmentCategoryForm);
  }

}
