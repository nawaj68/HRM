import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Messages } from 'src/app/core/services/message/messages';
import { AssetType } from 'src/app/feature/model/assettype.model';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { BranchInfo } from 'src/app/feature/model/branchInfo.model';
import { distinctUntilChanged, Subject } from 'rxjs';
import { FileUploader } from 'ng2-file-upload';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AssettypeService } from 'src/app/feature/service/assettype.service';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { BranchInfoService } from 'src/app/feature/service/branch-info.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { environment } from 'src/environments/environment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormExtension } from 'src/app/core/form/form-extension';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-assettype-create-update',
  templateUrl: './assettype-create-update.component.html',
  styleUrls: ['./assettype-create-update.component.scss']
})
export class AssettypeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/assettype.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  assettypeId: number;
  assettypeForm: FormGroup;
  assettypeFormValue: any;
  isEdit = false;
  avatar: any;
  avaterPreview: any;
  assettype: AssetType;
  branches: any;
  companyId: number;
  branchId: number;
  company: CompanyInfo[];
  branch: BranchInfo[];
  filterBranches: any;
  relatedPosts = [];
  status: [];
  today = new Date();

  filteredcompany: CompanyInfo[];
  filteredbranch: BranchInfo[];
  deptCtrl = new FormControl();

  private companySubject: Subject<string> = new Subject<string>();
  private branchSubject: Subject<string> = new Subject<string>();
  public uploader: FileUploader;
  uploadUrl: string;
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  
  tomorrow = new Date();
  
  displayedColumns: string[] = ["avatar","assetName", "action"];
  dataSource = new MatTableDataSource<AssetType>();
  selection = new SelectionModel<AssetType>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public assettypeService: AssettypeService,
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
    this.assettypeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.assettypeForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<AssetType>(e);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.assettypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.assettypeId;
    //this.filterBranches = this.branches;
    this.assettypeForm = this.form;
    this.assettypeForm.patchValue({id: this.assettypeId});
    this.getassetTypeDetail(this.assettypeId);
    this.uploader = new FileUploader({});
    this.getCompany("");
    this.getBranch("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
    this.branchSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getBranch(v)});
    // this.assettypeForm
    //   .get("companyId")
    //   ?.valueChanges.pipe(distinctUntilChanged())
    //   .subscribe({
    //     next: (companyId: number) => {
    //       this.companyId = companyId;
    //      // this.getState(countryId, "");
    //     },
    //   });
    // this.assettypeForm
    //   .get("branchId")
    //   ?.valueChanges.pipe(distinctUntilChanged())
    //   .subscribe({
    //     next: (branchId: number) => {
    //       this.branchId = branchId;
    //       //this.getCity(stateId, "");
    //     },
    //   });
  }
  getassetTypeDetail(assettypeId: any) {
    if (!this.assettypeId) return;
    this.assettypeService.getassetTypeDetail(assettypeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.assettype = res.data;
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
      assetName: ["", [Validators.required, Validators.maxLength(50)]],
      companyId: [null],
      branchId: [null],
      avatar: [null],
      avatarFile: []

    });
  }
  set form(user: any) {
    if (user !== null) {
      this.assettypeForm.patchValue({
        id: user.id,
        //userId: 1,
        userId: user.userId,
        assetName: user.assetName,
        companyId: user.companyId,
        branchId: user.branchId,
        avatar: user.avatar,
      });

      this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      this.avatar = user.avatar;
      console.log("path avater", this.avatar);
      console.log("path", user, this.assettypeForm.getRawValue());
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
    this.errors = FormExtension.getFormValidationErrors(this.assettypeForm);
    if (this.assettypeForm.invalid) {
      this.assettypeForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.assettypeFormValue = this.assettypeForm.getRawValue();
    console.log("save avater", this.avatar);
    this.assettypeForm.patchValue({avatar: this.avatar});
    this.formData = FormExtension.toFormData(this.assettypeForm);
    console.log("save", this.assettypeFormValue);

    debugger;
    if (this.assettypeFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.assettypeService.updateassetTypeDetail(this.assettypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['assetType']);
        },
      });
    } else {
      this.assettypeService.addassetTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['assetType']);
        },
      });
    }
  }
  reset(): void {
    this.assettypeForm.reset(this.form.value);
  }
  clearState(): void {
    this.assettypeForm.reset();
    this.assettypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.assettypeForm);
  }
  avatarUpload($event: any): void {
    const files = $event.target.files;
    console.log(files);
    this.assettypeForm.patchValue({
      avatarFile: files[0],
    });
    this.assettypeForm.get("image")?.updateValueAndValidity();
    this.cd.markForCheck();
    console.log(this.assettypeForm);
    this.uploader.setOptions({
      url: this.uploadUrl,
    });

    if (files.length === 0 || files == null) {
    }
    const file = files[0];

    if (file.size === 0) {
    }

    if (!this.fileHandler.fileValidate(file)) {
      this.uploader.clearQueue();
      return;
    }
  }
  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.assettypeForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.assettypeForm.patchValue({
          avatarFile: file,
        });
        this.avatar = file;
        this.avaterPreview = reader.result as string;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => {};
    }

    console.log(this.assettypeForm);
    // reader.readAsDataURL(file)
  }
}
