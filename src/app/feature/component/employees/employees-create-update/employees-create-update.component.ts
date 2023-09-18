import { SelectionModel } from '@angular/cdk/collections';
// import { COMMA, ENTER } from '@angular/cdk/keycodes/keycodes';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from "rxjs";
import { FileUploader } from 'ng2-file-upload';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Department } from 'src/app/feature/model/configurations/department.model';
import { Designation } from 'src/app/feature/model/configurations/designation.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { DepartmentService } from 'src/app/feature/service/configurations/department.service';
import { DesignationService } from 'src/app/feature/service/configurations/designation.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { environment } from 'src/environments/environment';
import { Gender } from 'src/app/feature/model/configurations/gender.model';
import { GenderService } from 'src/app/feature/service/configurations/gender.service';


@Component({
  selector: 'app-employees-create-update',
  templateUrl: './employees-create-update.component.html',
  styleUrls: ['./employees-create-update.component.scss']
})
export class EmployeesCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/employees.data.json";
  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  employeesId: number;
  employeesForm: FormGroup;
  employeesFormValue: any;
  isEdit = false;
  avatar: any;
  avaterPreview: any;
  employees: Employees;
  branches: any;
  designationId: number;
  departmentId: number;
  designation: Designation[];
  filteredDesignation: Designation[];
  filterBranches: any;

  genderId: number;
  gender: Gender[];
  filteredGender: Gender[];


  relatedPosts = [];
  status: [];
  today = new Date();
  
  filteredDepartments: Department[];
  deptCtrl = new FormControl();
  department: Department[];
  selectedDesignations: Designation[];

  private designationSubject: Subject<string> = new Subject<string>();
  private departmentSubject: Subject<string> = new Subject<string>();
  private genderSubject: Subject<string> = new Subject<string>();
  public uploader: FileUploader;
  uploadUrl: string;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["avatar", "name", "phone", "email", "genderId", "action"];
  dataSource = new MatTableDataSource<Employees>();
  selection = new SelectionModel<Employees>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public employeesService: EmployeesService,
    public designationService: DesignationService,
    public genderService: GenderService,
    public departmentService: DepartmentService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.employeesForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = { data: this.employeesForm.getRawValue(), errors: this.errors };
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Employees>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.employeesId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.employeesId;
    this.filterBranches = this.branches;
    this.employeesForm = this.form;
    this.employeesForm.patchValue({ id: this.employeesId });
    this.getEmployeesDetail(this.employeesId);
    this.uploader = new FileUploader({});
    this.getDesignation("");
    this.getGender("");
    this.genderSubject.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getGender(v) });
    this.designationSubject.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getDesignation(v) });
    this.departmentSubject.pipe(debounceTime(1000)).subscribe({ next: (departmentName: string) => this.getDepartment(this.designationId, departmentName) });
    this.employeesForm
      .get("designationId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (designationId: number) => {
          this.designationId = designationId;
          this.getDepartment(designationId, "");
        },
      });
  }

  getEmployeesDetail(employeesId: any) {
    if (!this.employeesId) return;
    this.employeesService.getEmployeesDetail(employeesId).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getGender(searchText: string) {
    this.genderService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.gender = res.data.data;
          this.filteredGender = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onGenderFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.genderSubject.next(value);
  }

  getDesignation(searchText: string) {
    this.designationService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.designation = res.data.data;
          this.filteredDesignation = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  getDepartment(designationId?: number, departmentName?: string) {
    if (!designationId) return;

    this.departmentService.getDropdownByDesignation(designationId, departmentName).subscribe({
      next: (res: any) => {
        if (res) {
          this.department = res.data.data;
          this.filteredDepartments = res.data.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      phone: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      dateOfBirth: [null, Validators.required],
      genderId: [1, Validators.required],
      address: [""],
      basicSalary: ['', [Validators.required]],
      status: [false],
      joiningDate: [null, Validators.required],
      resignDate: [null, Validators.required],
      designationId: [],
      departmentId: [],
      acountName: [],
      acountNumber: [],
      swiftCode: [],
      brance: [],
      avatar: [null],
      avatarFile: []

    });
  }

  set form(user: any) {
    if (user !== null) {
      this.employeesForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        name: user.name,
        phone: user.phone,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        genderId: user.genderId,
        address: user.address,
        basicSalary: user.basicSalary,
        status: user.status,
        joiningDate: user.joiningDate,
        resignDate: user.resignDate,
        designationId: user.designationId,
        departmentId: user.departmentId,
        acountName: user.acountName,
        acountNumber: user.acountNumber,
        swiftCode: user.swiftCode,
        brance: user.brance,
        avatar: user.avater
      });

      this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      this.avatar = user.avatar;
      console.log("path avater", this.avatar);
      console.log("path", user, this.employeesForm.getRawValue());
    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }

  onDesignationFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.designationSubject.next(value);
  }

  onDepartmentFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.departmentSubject.next(value);
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.employeesForm);
    if (this.employeesForm.invalid) {
      this.employeesForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.employeesFormValue = this.employeesForm.getRawValue();
    console.log("save avater", this.avatar);
    this.employeesForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.employeesForm);
    console.log("save", this.employeesFormValue);

    debugger;
    if (this.employeesFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.employeesService.updateUserDetail(this.employeesFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['employees']);
        },
      });
    } else {
      this.employeesService.addEmployeesDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['employees']);
        },
      });
    }
  }

  reset(): void {
    this.employeesForm.reset(this.form.value);
  }

  clearState(): void {
    this.employeesForm.reset();
    this.employeesForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.employeesForm);
  }

  avatarUpload($event: any): void {
    const files = $event.target.files;
    console.log(files);
    this.employeesForm.patchValue({
      avatarFile: files[0],
    });
    this.employeesForm.get("image")?.updateValueAndValidity();
    this.cd.markForCheck();
    console.log(this.employeesForm);
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
    this.employeesForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.employeesForm.patchValue({
          avatarFile: file,
        });
        this.avatar = file;
        this.avaterPreview = reader.result as string;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }

    console.log(this.employeesForm);
    // reader.readAsDataURL(file)
  }
}
