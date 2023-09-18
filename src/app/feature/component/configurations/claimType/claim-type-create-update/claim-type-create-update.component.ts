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
import { ClaimType } from 'src/app/feature/model/configurations/claimType.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { CliamTypeService } from 'src/app/feature/service/configurations/cliam-type.service';

@Component({
  selector: 'app-claim-type-create-update',
  templateUrl: './claim-type-create-update.component.html',
  styleUrls: ['./claim-type-create-update.component.scss']
})
export class ClaimTypeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/claimtype.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  claimTypeId: number;
  claimTypeForm: FormGroup;
  claimTypeFormValue: any;
  isEdit = false;
  claimType: ClaimType;
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

  displayedColumns: string[] = ["companyId","cliamTypeName","action"];
  dataSource = new MatTableDataSource<ClaimType>();
  selection = new SelectionModel<ClaimType>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public claimTypeService: CliamTypeService,
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
    this.claimTypeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.claimTypeForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<ClaimType>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.claimTypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.claimTypeId;
    this.claimTypeForm = this.form;
    this.claimTypeForm.patchValue({id: this.claimTypeId});
    this.getClaimTypeDetail(this.claimTypeId);
    this.getCompany("");
   
    this.companySubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getCompany(v)});
    
  }

  getClaimTypeDetail(claimTypeId: any) {
    if (!this.claimTypeId) return;
    this.claimTypeService.getClaimTypeDetail(claimTypeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.claimType= res.data;
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
      cliamTypeName: ["", [Validators.required]],
      
    
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.claimTypeForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        companyId: user.companyId,
        cliamTypeName: user.cliamTypeName,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.claimTypeForm);
    if (this.claimTypeForm.invalid) {
      this.claimTypeForm.markAllAsTouched();
      return;
    }

   
    this.claimTypeFormValue = this.claimTypeForm.getRawValue();
    this.formData = FormExtension.toFormData(this.claimTypeForm);
    console.log("save", this.claimTypeForm);

    if (this.claimTypeFormValue.id > 0) {

      this.claimTypeService.updateClaimTypeDetail(this.claimTypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/claimType']);
        },
      });
    } else {
      this.claimTypeService.addClaimTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/claimType']);
        },
      });
    }
  }

  reset(): void {
    this.claimTypeForm.reset(this.form.value);
  }

  clearState(): void {
    this.claimTypeForm.reset();
    this.claimTypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.claimTypeForm);
  }
}

