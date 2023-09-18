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
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Asset } from 'src/app/feature/model/asset.model';
import { AssetType } from 'src/app/feature/model/assettype.model';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { AssetService } from 'src/app/feature/service/asset.service';
import { AssettypeService } from 'src/app/feature/service/assettype.service';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';

@Component({
  selector: 'app-asset-create-update',
  templateUrl: './asset-create-update.component.html',
  styleUrls: ['./asset-create-update.component.scss']
})
export class AssetCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/asset.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  assetId: number;
  assetForm: FormGroup;
  assetFormValue: any;
  isEdit = false;
  asset: Asset;
  //branches: any;
  companyId: number;
  assetTypeId: number;
  company: CompanyInfo[];
  assetType: AssetType[];
  //filterBranches: any;
  relatedPosts = [];
  //status: [];
  today = new Date();

  filteredcompany: CompanyInfo[];
  filteredassetType: AssetType[];
  deptCtrl = new FormControl();

  private companySubject: Subject<string> = new Subject<string>();
  private assetTypeSubject: Subject<string> = new Subject<string>();
  // public uploader: FileUploader;
  // uploadUrl: string;
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  
  tomorrow = new Date();
  
  displayedColumns: string[] = ["assetName","assetCode","companyId","serialNumber","modelNumber","action"];
  dataSource = new MatTableDataSource<Asset>();
  selection = new SelectionModel<Asset>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(   
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public assetService: AssetService,
    public companyinfoService: CompanyinfoService,
    public assetTypeService: AssettypeService,
    //private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.assetForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.assetForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }

    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<Asset>(e);
      });
    }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.assetId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.assetId;
    //this.filterBranches = this.branches;
    this.assetForm = this.form;
    this.assetForm.patchValue({id: this.assetId});
    this.getAssetDetail(this.assetId);
    //this.uploader = new FileUploader({});
    this.getCompany("");
    this.getassetType("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
    this.assetTypeSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getassetType(v)});

  }
  getAssetDetail(assetId: any) {
    if (!this.assetId) return;
    this.assetService.getAsetDetail(assetId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.asset = res.data;
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
  getassetType(searchText: string) {
    this.assetTypeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.assetType = res.data.data;
          this.filteredassetType = res.data.data;
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
      assetName: ["", [Validators.required, Validators.maxLength(50)]],
      assetCode:[""],
      supplierId:[],
      manufacturerId:[],
      serialNumber:[],
      modelNumber:[],
      companyId: [null],
      assetTypeId: [null],
      purchaseDate: [null],
      warrantyPeriod: [null],
      assetStatusId:[null]
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.assetForm.patchValue({
        id: user.id,
        //userId: 2,//
        userId:user.userId,
        assetName: user.assetName,
        assetCode: user.assetCode,
        supplierId:user.supplierId,
        manufacturerId:user.manufacturerId,
        serialNumber:user.serialNumber,
        modelNumber:user.modelNumber,
        companyId:user.companyId,
        assetTypeId: user.assetTypeId,
        purchaseDate:user.purchaseDate,
        warrantyPeriod:user.warrantyPeriod,
        assetStatusId:user.assetStatusId,
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
  onassetTypeFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.assetTypeSubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.assetForm);
    if (this.assetForm.invalid) {
      this.assetForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.assetFormValue = this.assetForm.getRawValue();
    //console.log("save avater", this.avatar);
    //this.assettypeForm.patchValue({avatar: this.avatar});
    this.formData = FormExtension.toFormData(this.assetForm);
    console.log("save", this.assetFormValue);

    debugger;
    if (this.assetFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.assetService.updateAssetDetail(this.assetFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['asset']);
        },
      });
    } else {
      this.assetService.addAssetDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['asset']);
        },
      });
    }
  }
  reset(): void {
    this.assetForm.reset(this.form.value);
  }
  clearState(): void {
    this.assetForm.reset();
    this.assetForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.assetForm);
  }
}
