import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { AwardInfo } from 'src/app/feature/model/award-info.model';
import { AwardType } from 'src/app/feature/model/configurations/awardType.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { AwardInfoService } from 'src/app/feature/service/award-info.service';
import { AwardTypeService } from 'src/app/feature/service/configurations/award-type.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-award-info-create-update',
  templateUrl: './award-info-create-update.component.html',
  styleUrls: ['./award-info-create-update.component.scss']
})
export class AwardInfoCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/awardInfo.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  awardInfoId: number;
  awardInfoForm: FormGroup;
  awardInfoFormValue: any;
  isEdit = false;
  avatar: any;
  avaterPreview: any;
  awardInfo: AwardInfo;

  employees:Employees[];
  filteredemployees:Employees[];

  awardTypes:AwardType[];
  filteredAwardType:AwardType[];

  public uploader: FileUploader;
  uploadUrl: string;

  private employeeSubjet: Subject<string> = new Subject<string>();
  private awardTypeSubjet: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["awardName", "gift", "priceAmount", "avatar", "remark", "action"];

  dataSource = new MatTableDataSource<AwardInfo>();
  selection = new SelectionModel<AwardInfo>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public awardInfoService: AwardInfoService,
    public employeeService:EmployeesService,
    public awardTypeService: AwardTypeService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.awardInfoId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.awardInfoId;
    this.awardInfoForm = this.form;
    this.awardInfoForm.patchValue({ id: this.awardInfoId });
    this.getAwardInfoDetail(this.awardInfoId);
    this.getEmployees("");
    this.getAwardType("");
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.awardTypeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getAwardType(v) });
    this.uploader = new FileUploader({});
  }

  getAwardInfoDetail(awardInfoId: any) {
    if (!this.awardInfoId) return;
    this.awardInfoService.getAwardInfoDetail(awardInfoId).subscribe({
      next: (res: any) => {
        if (res) {
          this.awardInfo = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getEmployees(searchText: string){
    this.employeeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredemployees = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });

  }
  onEmployeeFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeeSubjet.next(value);
  }

  getAwardType(searchText: string){
    this.awardTypeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.awardTypes = res.data.data;
          this.filteredAwardType = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  onAwardTypeFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.awardTypeSubjet.next(value);
  }
  
  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      employeeId: [],
      awardTypeId: [],
      awardName: ["", [Validators.required]],
      gift: ["", Validators.required],
      priceAmount: ["", Validators.required],
      avatar: [null],
      avatarFile: [],
      remark:[""]

    });
  }

  set form(user: any) {
    if (user !== null) {
      this.awardInfoForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        awardTypeId: user.awardTypeId,
        awardName: user.awardName,
        gift: user.gift,
        priceAmount: user.priceAmount,
        avatar: user.avater,
        remark: user.remark

      });

      this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      this.avatar = user.avatar;
      console.log("path avater", this.avatar);
      console.log("path", user, this.awardInfoForm.getRawValue());
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.awardInfoForm);
    if (this.awardInfoForm.invalid) {
      this.awardInfoForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.awardInfoFormValue = this.awardInfoForm.getRawValue();
    console.log("save avater", this.avatar);
    this.awardInfoForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.awardInfoForm);
    console.log("save", this.awardInfoFormValue);

    debugger;
    if (this.awardInfoFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.awardInfoService.updateAwardInfoDetail(this.awardInfoFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['awardInfo']);
        },
      });
    } else {
      this.awardInfoService.addAwardInfoDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['awardInfo']);
        },
      });
    }
  }

  reset(): void {
    this.awardInfoForm.reset(this.form.value);
  }

  clearState(): void {
    this.awardInfoForm.reset();
    this.awardInfoForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.awardInfoForm);
  }

  avatarUpload($event: any): void {
    const files = $event.target.files;
    console.log(files);
    this.awardInfoForm.patchValue({
      avatarFile: files[0],
    });
    this.awardInfoForm.get("image")?.updateValueAndValidity();
    this.cd.markForCheck();
    console.log(this.awardInfoForm);
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
    this.awardInfoForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.awardInfoForm.patchValue({
          avatarFile: file,
        });
        this.avatar = file;
        this.avaterPreview = reader.result as string;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }

    console.log(this.awardInfoForm);
    // reader.readAsDataURL(file)
  }

}
