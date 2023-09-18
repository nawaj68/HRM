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
import { Employees } from 'src/app/feature/model/employees.model';
import { FamilyInfo } from 'src/app/feature/model/family-info.model';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { FamilyInfoService } from 'src/app/feature/service/family-info.service';

@Component({
  selector: 'app-family-information-create-update',
  templateUrl: './family-information-create-update.component.html',
  styleUrls: ['./family-information-create-update.component.scss']
})
export class FamilyInformationCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/familyInfo.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  familyInfoId: number;
  relationshipId:number;
  familyInfoForm: FormGroup;
  familyInfoFormValue: any;
  isEdit = false;
  familyInfo: FamilyInfo;
  employeeId: number;
  genderId: number;
  nationalityId: number;
  employees: Employees[];
  filteredEmployees: Employees[];

  genders = [
    {value: 1, text: "male"},
     {value: 3, text: "female"},
    {value: 4, text: "other"},
   ];
   relationShip = [
    {value: 1, text: "Brother"},
     {value: 3, text: "Sister"},
    {value: 4, text: "other"},
   ];

  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private employeesSubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["familyMemberName","relationshipId", "contactNumber", "profession","action"];
  dataSource = new MatTableDataSource<FamilyInfo>();
  selection = new SelectionModel<FamilyInfo>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public familyInfoService: FamilyInfoService,
    public employeesService: EmployeesService,
   
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.familyInfoForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.familyInfoForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<FamilyInfo>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.familyInfoId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.familyInfoId;
    this.familyInfoForm = this.form;
    this.familyInfoForm.patchValue({id: this.familyInfoId});
    this.getFamilyInfoDetail(this.familyInfoId);
    this.getEmployee("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getEmployee(v)});

  }

  getFamilyInfoDetail(familyInfoId: any) {
    if (!this.familyInfoId) return;
    this.familyInfoService.getFamilyInfoDetail(familyInfoId).subscribe({
      next: (res: any) => {
        if (res) {
          this.familyInfo= res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  onEmployeeFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.employeesSubject.next(value);
  }

  getEmployee(searchText: string) {
    this.employeesService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredEmployees = res.data.data;
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
      familyMemberName: ["", [Validators.required, Validators.maxLength(50)]],
      dob: [null, Validators.required],
      genderId: [1, Validators.required],
      nationalityId: ["", [Validators.required]],
      employeeId: ["",[Validators.required]],
      relationshipId: [1, [Validators.required]],
      contactNumber: ["", [Validators.required]],
      profession: ["", [Validators.required]],
      address:  ["", [Validators.required]],
      emergencyContact:  ["", [Validators.required]],
     
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.familyInfoForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        familyMemberName: user.familyMemberName,
        dob: user.dob,
        genderId: user.genderId,
        nationalityId: user.nationalityId,
        employeeId: user.employeeId,
        relationshipId: user.relationshipId,
        contactNumber: user.contactNumber,
        profession: user.profession,
        address: user.address,
        emergencyContact: user.emergencyContact,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
  onCountryFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeesSubject.next(value);
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.familyInfoForm);
    if (this.familyInfoForm.invalid) {
      this.familyInfoForm.markAllAsTouched();
      return;
    }

  
    this.familyInfoFormValue = this.familyInfoForm.getRawValue();
    this.formData = FormExtension.toFormData(this.familyInfoForm);
    console.log("save", this.familyInfoForm);

    if (this.familyInfoFormValue.id > 0) {

      this.familyInfoService.updateFamilyInfoDetail(this.familyInfoFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
        },
      });
    } else {
      this.familyInfoService.addFamilyInfoDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
        },
      });
    }
  }

  reset(): void {
    this.familyInfoForm.reset(this.form.value);
  }

  clearState(): void {
    this.familyInfoForm.reset();
    this.familyInfoForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.familyInfoForm);
  }
}
