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
import { Country } from 'src/app/feature/model/configurations/country.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { Passport } from 'src/app/feature/model/passport.model';
import { CountryService } from 'src/app/feature/service/configurations/country.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { PassportService } from 'src/app/feature/service/passport.service';

@Component({
  selector: 'app-passport-create-update',
  templateUrl: './passport-create-update.component.html',
  styleUrls: ['./passport-create-update.component.scss']
})
export class PassportCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/passport.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  passportId: number;
  passportForm: FormGroup;
  passportFormValue: any;
  isEdit = false;
  passport: Passport;
  employeeId: number;
  countryId: number;
  employees: Employees[];
  filteredEmployees: Employees[];
  countries: Country[];
  filteredcountry: Country[];

  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private employeesSubject: Subject<string> = new Subject<string>();
  private countrySubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["employeeId","passportNumber", "countryId", "expireDate","action"];
  dataSource = new MatTableDataSource<Passport>();
  selection = new SelectionModel<Passport>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public passportService: PassportService,
    public employeesService: EmployeesService,
    public countryService: CountryService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.passportForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.passportForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Passport>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.passportId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.passportId;
    this.passportForm = this.form;
    this.passportForm.patchValue({id: this.passportId});
    this.getPassportDetail(this.passportId);
    this.getEmployee("");
    this.getCountry("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getEmployee(v)});
    this.countrySubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getCountry(v)});
  }

  getPassportDetail(passportId: any) {
    if (!this.passportId) return;
    this.passportService.getPassportDetail(passportId).subscribe({
      next: (res: any) => {
        if (res) {
          this.passport= res.data;
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
  onCountryFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.countrySubject.next(value);
  }

  getCountry(searchText: string) {
    this.countryService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.countries = res.data.data;
          this.filteredcountry = res.data.data;
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
      employeeId: ["",[Validators.required]],
      passportNumber: ["", [Validators.required]],
      countryId: [null, Validators.required],
      issueDate: ["", [Validators.required]],
      expireDate: ["", [Validators.required]],
      remark: ["", Validators.required],
    
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.passportForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        passportNumber: user.passportNumber,
        countryId: user.countryId,
        issueDate: user.issueDate,
        expireDate: user.expireDate,
        remark: user.remark,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.passportForm);
    if (this.passportForm.invalid) {
      this.passportForm.markAllAsTouched();
      return;
    }

   
    this.passportFormValue = this.passportForm.getRawValue();
    this.formData = FormExtension.toFormData(this.passportForm);
    console.log("save", this.passportForm);

    if (this.passportFormValue.id > 0) {

      this.passportService.updatePassportDetail(this.passportFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/passport']);
        },
      });
    } else {
      this.passportService.addPassportDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/passport']);
        },
      });
    }
  }

  reset(): void {
    this.passportForm.reset(this.form.value);
  }

  clearState(): void {
    this.passportForm.reset();
    this.passportForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.passportForm);
  }
}