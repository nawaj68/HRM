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
import { distinctUntilChanged, Observable, Subject, debounceTime } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { City } from 'src/app/feature/model/configurations/city.model';
import { Country } from 'src/app/feature/model/configurations/country.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { CityService } from 'src/app/feature/service/configurations/city.service';
import { CountryService } from 'src/app/feature/service/configurations/country.service';
import { StateService } from 'src/app/feature/service/configurations/state.service';
import { State } from '../../enrollee/enrolle-entry/enrolle-entry.component';
import { CompanyInfo } from './../../../model/companyinfo.model';

@Component({
  selector: 'app-companyinfo-create-update',
  templateUrl: './companyinfo-create-update.component.html',
  styleUrls: ['./companyinfo-create-update.component.scss']
})
export class CompanyinfoCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/companyinfo.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  companyInfoId: number;
  companyInfoForm:FormGroup;
  companyInfoFormValue: any;
  isEdit = false;
  companyInfo: CompanyInfo;
  countryId: number;

  countries: Country[];
  filteredCountries: Country[];
  
  cityId: number;
  cities: City[];
  filteredCities: City[];

  stateId: number;
  states: State[];
  filteredStates: State[];
  
  today = new Date();

  selectedStates: State[] = [];
  private countrySubject: Subject<string> = new Subject<string>();
  private stateSubject: Subject<string> = new Subject<string>();
  private citySubject: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["companyName", "address", "contactNumber", "action"];
  dataSource = new MatTableDataSource<CompanyInfo>();
  selection = new SelectionModel<CompanyInfo>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public companyinfoService: CompanyinfoService,
    public stateService: StateService,
    public countryService: CountryService,
    public cityService: CityService,
    //private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.companyInfoForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.companyInfoForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<CompanyInfo>(e);
    });
  }

 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.companyInfoId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.companyInfoId;
   
    this.companyInfoForm = this.form;
    this.companyInfoForm.patchValue({id: this.companyInfoId});
    this.getUserInformationDetail(this.companyInfoId);
    this.getCountry("");
    this.countrySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCountry(v)});
    this.stateSubject.pipe(debounceTime(1000)).subscribe({next: (stateName: string) => this.getState(this.countryId, stateName)});
    this.companyInfoForm
      .get("countryId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (countryId: number) => {
          this.countryId = countryId;
          this.getState(countryId, "");
        },
      });
    this.companyInfoForm
      .get("stateId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (stateId: number) => {
          this.stateId = stateId;
          this.getCity(stateId, "");
        },
      });
    
  }

  getUserInformationDetail(userInformationId: any) {
    if (!this.companyInfoId) return;
    this.companyinfoService.getCompanyinfoDetail(userInformationId).subscribe({
      next: (res: any) => {
        if (res) {
          this.companyInfo = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getCountry(searchText: string) {
    this.countryService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.countries = res.data.data;
          this.filteredCountries = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  getState(countryId?: number, stateName?: string) {
    if (!countryId) return;

    this.stateService.getDropdownByCountry(countryId, stateName).subscribe({
      next: (res: any) => {
        if (res) {
          this.states = res.data.data;
          this.filteredStates = res.data.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getCity(stateId?: number, cityName?: string) {
    if (!stateId) return;
    this.cityService.getDropdownByState(stateId, cityName).subscribe({
      next: (res: any) => {
        if (res) {
          this.cities = res.data.data;
          this.filteredCities = res.data.data;
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
      companyName: ["", [Validators.required, Validators.maxLength(50)]],
      address:[],
      contactNumber: ["", [Validators.required]],
      countryId: [null],
      cityId: [null],
      stateId: [null],
      zipCode: [null],
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.companyInfoForm.patchValue({
      id: user.id,
      userId: 1,//user.userId,
      companyName:user.companyName,
      address:user.address,
      contactNumber:user.contactNumber ,
      countryId:user.countryId,
      cityId:user.stateId,
      stateId:user.cityId,
      zipCode:user.zipCode
      });
    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
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

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.companyInfoForm);
    if (this.companyInfoForm.invalid) {
      this.companyInfoForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.companyInfoFormValue = this.companyInfoForm.getRawValue();
    
    this.formData = FormExtension.toFormData(this.companyInfoForm);
    console.log("save", this.companyInfoFormValue);

    debugger;
    if (this.companyInfoFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.companyinfoService.updateCompanyDetail(this.companyInfoFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['company']);
        },
      });
    } else {
      this.companyinfoService.addCompanyinfoDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['company']);
        },
      });
    }
  }

  reset(): void {
    this.companyInfoForm.reset(this.form.value);
  }

  clearState(): void {
    this.companyInfoForm.reset();
    this.companyInfoForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.companyInfoForm);
  }

}
