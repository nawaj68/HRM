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
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { WarningType } from 'src/app/feature/model/configurations/warningType.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { WarningTypeService } from 'src/app/feature/service/configurations/warning-type.service';

@Component({
  selector: 'app-warning-type-create-update',
  templateUrl: './warning-type-create-update.component.html',
  styleUrls: ['./warning-type-create-update.component.scss']
})
export class WarningTypeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/warningtype.data.json";
  
  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  warningTypeId: number;
  warningTypeForm: FormGroup;
  warningTypeFormValue: any;
  isEdit = false;
  warningType: WarningType;
  comapnyId: number;
  company: CompanyInfo[];
  filteredCompanyInfo: CompanyInfo[];
 

  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private companySubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["companyId","warningTypeName", "status","action"];
  dataSource = new MatTableDataSource<WarningType>();
  selection = new SelectionModel<WarningType>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public warningTypeService: WarningTypeService,
    public companyinfoService: CompanyinfoService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.warningTypeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.warningTypeForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<WarningType>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.warningTypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.warningTypeId;
    this.warningTypeForm = this.form;
    this.warningTypeForm.patchValue({id: this.warningTypeId});
    this.getWarningTypeDetail(this.warningTypeId);
    this.getCompany("");
   
    this.companySubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getCompany(v)});
    
  }

  getWarningTypeDetail(warningTypeId: any) {
    if (!this.warningTypeId) return;
    this.warningTypeService.getWarningTypeDetail(warningTypeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.warningType= res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  onCompanyFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.companySubject.next(value);
  }

  getCompany(searchText: string) {
    this.companyinfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.company = res.data.data;
          this.filteredCompanyInfo = res.data.data;
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
      companyId: ["",[Validators.required]],
      warningTypeName: ["", [Validators.required]],
      status: [""],
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.warningTypeForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        companyId: user.companyId,
        warningTypeName: user.warningTypeName,
        status: user.status,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.warningTypeForm);
    if (this.warningTypeForm.invalid) {
      this.warningTypeForm.markAllAsTouched();
      return;
    }

   
    this.warningTypeFormValue = this.warningTypeForm.getRawValue();
    this.formData = FormExtension.toFormData(this.warningTypeForm);
    console.log("save", this.warningTypeForm);

    if (this.warningTypeFormValue.id > 0) {

      this.warningTypeService.updateWarningTypeDetail(this.warningTypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/warningType']);
        },
      });
    } else {
      this.warningTypeService.addWarningTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/warningType']);
        },
      });
    }
  }

  reset(): void {
    this.warningTypeForm.reset(this.form.value);
  }

  clearState(): void {
    this.warningTypeForm.reset();
    this.warningTypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.warningTypeForm);
  }
}


