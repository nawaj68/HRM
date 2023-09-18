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
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { City } from 'src/app/feature/model/configurations/city.model';
import { Country } from 'src/app/feature/model/configurations/country.model';
import { Contact } from 'src/app/feature/model/contact.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { CityService } from 'src/app/feature/service/configurations/city.service';
import { CountryService } from 'src/app/feature/service/configurations/country.service';
import { StateService } from 'src/app/feature/service/configurations/state.service';
import { ContactService } from 'src/app/feature/service/contact.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { State } from '../../enrollee/enrolle-entry/enrolle-entry.component';

@Component({
  selector: 'app-contact-create-update',
  templateUrl: './contact-create-update.component.html',
  styleUrls: ['./contact-create-update.component.scss']
})
export class ContactCreateUpdateComponent implements OnInit {

  // jsonUrl = "assets/data/contact.data.json";

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  contact: Contact;

  userId: number;
  contactId:number;
  contactForm:FormGroup;
  contactFormValue:any;
  employeeId:number;
  presentCountryId:number;
  presentStateId:number;
  presentCityId:number;
  permanentAddress:string;
  permanentCountryId:number;
  permanentStateId:number;
  permanentCityId:number;
  employees: Employees[];
  filteredEmployees: Employees[];
  countries: Country[];
  filteredPresentCountries: Country[];
  filteredPermanentCountries: Country[];
  filteredPresentStates: State[];
  filteredPermanentStates: State[];
  filteredPresentCities: City[];
  filteredPermanentCities: City[];
  states: State[];
  selectedStates: State[];
  cities = [];
  tomorrow = new Date();


  private employeeSubject: Subject<string> = new Subject<string>();
  private countrySubject: Subject<string> = new Subject<string>();
  private stateSubject: Subject<string> = new Subject<string>();
  private citySubject: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["officeMobileNo","personalMobileNo","officeEmail", "personalEmail", "action"];
  dataSource = new MatTableDataSource<Contact>();
  selection = new SelectionModel<Contact>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public contactService:ContactService,
    public employeeService:EmployeesService,
    
    public stateService: StateService,
    public countryService: CountryService,
    public cityService: CityService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.contactId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.contactId;
    this.contactForm = this.form;
    this.contactForm.patchValue({id: this.contactId});
    this.getContactDetail(this.contactId);
    this.getPresentCountry("");
    this.getPermanentCountry("");
    this.getEmployee("");
    this.employeeSubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getEmployee(v)});
    this.countrySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getPresentCountry(v)});
    this.countrySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getPermanentCountry(v)});
    this.stateSubject.pipe(debounceTime(1000)).subscribe({next: (stateName: string) => this.getPresentState(this.presentCountryId, stateName)});
    this.stateSubject.pipe(debounceTime(1000)).subscribe({next: (stateName: string) => this.getPermanentState(this.permanentCountryId, stateName)});
    this.contactForm
      .get("presentCountryId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (presentCountryId: number) => {
          this.presentCountryId = presentCountryId;
          this.getPresentState(presentCountryId, "");
        },
      });
    this.contactForm
      .get("permanentCountryId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (permanentCountryId: number) => {
          this.permanentCountryId = permanentCountryId;
          this.getPermanentState(permanentCountryId, "");
        },
      });
    this.contactForm
      .get("presentStateId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (presentStateId: number) => {
          this.presentStateId = presentStateId;
          this.getPresentCity(presentStateId, "");
        },
      });
    this.contactForm
      .get("permanentStateId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (permanentStateId: number) => {
          this.permanentStateId = permanentStateId;
          this.getPermanentCity(permanentStateId, "");
        },
      });
  }

  getContactDetail(contactId: any) {
    if (!this.contactId) return;
    this.contactService.getContactDetail(contactId).subscribe({
      next: (res: any) => {
        if (res) {
          this.contact = res.data;
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
    this.employeeSubject.next(value);
  }

  getPresentCountry(searchText: string) {
    this.countryService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.countries = res.data.data;
          this.filteredPresentCountries = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  getPermanentCountry(searchText: string) {
    this.countryService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.countries = res.data.data;
          this.filteredPermanentCountries = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  getEmployee(searchText: string) {
    this.employeeService.getDropdown(0, 10, searchText).subscribe({
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

  getPresentState(countryId?: number, stateName?: string) {
    if (!countryId) return;

    this.stateService.getDropdownByCountry(countryId, stateName).subscribe({
      next: (res: any) => {
        if (res) {
          this.states = res.data.data;
          this.filteredPresentStates = res.data.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  getPermanentState(countryId?: number, stateName?: string) {
    if (!countryId) return;

    this.stateService.getDropdownByCountry(countryId, stateName).subscribe({
      next: (res: any) => {
        if (res) {
          this.states = res.data.data;
          this.filteredPermanentStates = res.data.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getPresentCity(stateId?: number, cityName?: string) {
    if (!stateId) return;
    this.cityService.getDropdownByState(stateId, cityName).subscribe({
      next: (res: any) => {
        if (res) {
          this.cities = res.data.data;
          this.filteredPresentCities = res.data.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  getPermanentCity(stateId?: number, cityName?: string) {
    if (!stateId) return;
    this.cityService.getDropdownByState(stateId, cityName).subscribe({
      next: (res: any) => {
        if (res) {
          this.cities = res.data.data;
          this.filteredPermanentCities = res.data.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  onCountryFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.countrySubject.next(value);
  }

  onStateFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.stateSubject.next(value);
  }

  onCityFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.citySubject.next(value);
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      employeeId:[1],
      officeMobileNo:["",[Validators.required, Validators.maxLength(50)]],
      personalMobileNo:["",[Validators.required]],
      officeEmail:["",[Validators.email, Validators.required]],
      personalEmail:["",[Validators.email, Validators.required]],
      presentAddress:[],
      presentCountryId:[],
      presentStateId:[],
      presentCityId:[],
      presentZipCode:[],
      permanentAddress:[],
      permanentCountryId:[],
      permanentStateId:[],
      permanentCityId:[],
      permanentZipCode:[]      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.contactForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        officeMobileNo:user.officeMobileNo,
        personalMobileNo:user.personalMobileNo,
        officeEmail:user.officeEmail,
        personalEmail: user.personalEmail,
        presentAddress:user.presentAddress,
        presentCountryId:user.presentCountryId,
        presentStateId:user.presentStateId,
        presentCityId:user.presentCityId,
        presentZipCode:user.presentZipCode,
        permanentAddress:user.permanentAddress,
        permanentCountryId:user.permanentCountryId,
        permanentStateId:user.permanentStateId,
        permanentCityId:user.permanentCityId,
        permanentZipCode:user.permanentZipCode
      });
    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }

  

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.contactForm);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.contactFormValue = this.contactForm.getRawValue();
    this.formData = FormExtension.toFormData(this.contactForm);
    console.log("save", this.contactFormValue);

    debugger;
    if (this.contactFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.contactService.updateContactDetail(this.contactFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
        },
      });
    } else {
      this.contactService.addContactDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
        },
      });
    }
  }

  reset(): void {
    this.contactForm.reset(this.form.value);
  }

  clearState(): void {
    this.contactForm.reset();
    this.contactForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.contactForm);
  }

}
