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
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { AwardTypeService } from 'src/app/feature/service/configurations/award-type.service';
import { AwardType } from '../../../model/configurations/awardType.model';

@Component({
  selector: 'app-award-type-create-update',
  templateUrl: './award-type-create-update.component.html',
  styleUrls: ['./award-type-create-update.component.scss']
})
export class AwardTypeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/awardType.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  awardTypeId: number;
  awardTypeForm: FormGroup;
  awardTypeFormValue: any;
  isEdit = false;
  awardType: AwardType;
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
  
  displayedColumns: string[] = ["companyId","documentCategorieName","status","action"];
  dataSource = new MatTableDataSource<AwardType>();
  selection = new SelectionModel<AwardType>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public awardTypeService: AwardTypeService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.awardTypeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.awardTypeForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<AwardType>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.awardTypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.awardTypeId;
    this.awardTypeForm = this.form;
    this.awardTypeForm.patchValue({id: this.awardTypeId});
    this.getAwardTypeDetail(this.awardTypeId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getAwardTypeDetail(awardTypeId: any) {
    if (!this.awardTypeId) return;
    this.awardTypeService.getAwardTypeDetail(awardTypeId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.awardType= res.data;
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
      awardTypeName: ["",[Validators.required,Validators.maxLength(20)]],
      status: [false]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.awardTypeForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        awardTypeName:user.awardTypeName,
        status:user.status
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.awardTypeForm);
    if (this.awardTypeForm.invalid) {
      this.awardTypeForm.markAllAsTouched();
      return;
    }

    this.awardTypeFormValue = this.awardTypeForm.getRawValue();
    this.formData = FormExtension.toFormData(this.awardTypeForm);
    console.log("save", this.awardTypeFormValue);

    debugger;
    if (this.awardTypeFormValue.id > 0) {
      this.awardTypeService.updateAwardTypeDetail(this.awardTypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['awardType']);
        },
      });
    } else {
      this.awardTypeService.addAwardTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['awardType']);
        },
      });
    }
  }
  reset(): void {
    this.awardTypeForm.reset(this.form.value);
  }
  clearState(): void {
    this.awardTypeForm.reset();
    this.awardTypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.awardTypeForm);
  }
}
