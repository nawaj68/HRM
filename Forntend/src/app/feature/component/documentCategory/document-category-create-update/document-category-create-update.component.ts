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
import { DocumentCategory } from 'src/app/feature/model/configurations/documentCategory.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { DocumentcategoryService } from 'src/app/feature/service/configurations/documentcategory.service';

@Component({
  selector: 'app-document-category-create-update',
  templateUrl: './document-category-create-update.component.html',
  styleUrls: ['./document-category-create-update.component.scss']
})
export class DocumentCategoryCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/documentCategory.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  documentCategoryId: number;
  documentCategoryForm: FormGroup;
  documentCategoryFormValue: any;
  isEdit = false;
  documentCategory: DocumentCategory;
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
  
  displayedColumns: string[] = ["companyInfo","documentCategorieName","status","action"];
  dataSource = new MatTableDataSource<DocumentCategory>();
  selection = new SelectionModel<DocumentCategory>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public documentCategoryService: DocumentcategoryService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.documentCategoryForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.documentCategoryForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<DocumentCategory>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.documentCategoryId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.documentCategoryId;
    this.documentCategoryForm = this.form;
    this.documentCategoryForm.patchValue({id: this.documentCategoryId});
    this.getEducationtypeDetail(this.documentCategoryId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getEducationtypeDetail(documentCategoryId: any) {
    if (!this.documentCategoryId) return;
    this.documentCategoryService.getDocumentCategoryDetail(documentCategoryId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.documentCategory= res.data;
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
      documentCategorieName: ["",[Validators.required,Validators.maxLength(20)]],
      status: [false]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.documentCategoryForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        documentCategorieName:user.documentCategorieName,
        status:user.status
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.documentCategoryForm);
    if (this.documentCategoryForm.invalid) {
      this.documentCategoryForm.markAllAsTouched();
      return;
    }

    this.documentCategoryFormValue = this.documentCategoryForm.getRawValue();
    this.formData = FormExtension.toFormData(this.documentCategoryForm);
    console.log("save", this.documentCategoryFormValue);

    debugger;
    if (this.documentCategoryFormValue.id > 0) {
      this.documentCategoryService.updateDocumentCategoryDetail(this.documentCategoryFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['documentCategory']);
        },
      });
    } else {
      this.documentCategoryService.addDocumentCategoryDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['documentCategory']);
        },
      });
    }
  }
  reset(): void {
    this.documentCategoryForm.reset(this.form.value);
  }
  clearState(): void {
    this.documentCategoryForm.reset();
    this.documentCategoryForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.documentCategoryForm);
  }
}
