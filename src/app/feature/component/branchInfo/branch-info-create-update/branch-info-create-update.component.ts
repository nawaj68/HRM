import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
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
import { BranchInfo } from 'src/app/feature/model/branchInfo.model';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { City } from 'src/app/feature/model/configurations/city.model';
import { Country } from 'src/app/feature/model/configurations/country.model';
import { State } from 'src/app/feature/model/configurations/state.model';
import { BranchInfoService } from 'src/app/feature/service/branch-info.service';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { CityService } from 'src/app/feature/service/configurations/city.service';
import { CountryService } from 'src/app/feature/service/configurations/country.service';
import { StateService } from 'src/app/feature/service/configurations/state.service';


@Component({
  selector: 'app-branch-info-create-update',
  templateUrl: './branch-info-create-update.component.html',
  styleUrls: ['./branch-info-create-update.component.scss']
})
export class BranchInfoCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/branchInfo.data.json";
  message = Messages;
  errors: any;
  formData: any;
  userId: number;
  branchInfoId: number;
  branchInfoForm: FormGroup;
  branchInfoFormValue: any;
  isEdit = false;
  branchInfo: BranchInfo;
  filteredCompany:any;
  countryId: number;
  stateId: number;
  cityId: number;
  countries: Country[];
  filteredCountries: Country[];
  states: State[];
  filteredStates: State[];
  cities: City[];
  filteredCities: City[];

  companies:CompanyInfo[];
  filteredCompanies:CompanyInfo[];

  selectedStates: State[] = [];

  
  private companySubject: Subject<string> = new Subject<string>();
  private countrySubject: Subject<string> = new Subject<string>();
  private stateSubject: Subject<string> = new Subject<string>();
  private citySubject: Subject<string> = new Subject<string>();
    
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["branchName","branchAddress", "zipCode", "email", "contact", "action"];
  dataSource = new MatTableDataSource<BranchInfo>();
  selection = new SelectionModel<BranchInfo>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public branchInfoService: BranchInfoService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService,
    public stateService: StateService,
    public countryService: CountryService,
    public cityService: CityService,
    public companyService:CompanyinfoService,
  ) { }
  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.branchInfoForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.branchInfoForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<BranchInfo>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.branchInfoId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.branchInfoId;
    this.branchInfoForm = this.form;
    this.getCountry("");
    this.getCompany("");
    this.branchInfoForm.patchValue({id: this.branchInfoId});
    this.getBranchInfoDetail(this.branchInfoId);
    this.countrySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCountry(v)});
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
    this.stateSubject.pipe(debounceTime(1000)).subscribe({next: (stateName: string) => this.getState(this.countryId, stateName)});
    this.branchInfoForm
      .get("countryId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (countryId: number) => {
          this.countryId = countryId;
          this.getState(countryId, "");
        },
      });
    this.branchInfoForm
      .get("stateId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (stateId: number) => {
          this.stateId = stateId;
          this.getCity(stateId, "");
        },
      });
    // this.branchInfoForm
    //   .get("designationId")
    //   ?.valueChanges.pipe(distinctUntilChanged())
    //  .subscribe({
    //      next: (designationId: number) => {
    //       this.designationId = designationId;
    //       this.getDepartment(designationId, "");
    //     },
    //   });
  }
  
  
  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      branchName: ["",[Validators.required, Validators.maxLength(50)]],
      companyId: [1],
      contactNumber: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      branchAddress: [""],     
      countryId:[],
      stateId:[],
      cityId:[],
      zipCode:[""],
    });
  }

  set form(branchInfo: any) {
    if (branchInfo !== null) {
      this.branchInfoForm.patchValue({
        id: branchInfo.id,
        //userId: 1,//
        userId: branchInfo.userId,
        branchName: branchInfo.branchName,
        companyId: branchInfo.companyId,
        contactNumber:branchInfo.contactNumber,
        email:branchInfo.email,
        branchAddress:branchInfo.branchAddress,
        countryId:branchInfo.countryId,
        stateId:branchInfo.stateId,
        cityId:branchInfo.cityId,
        zipCode:branchInfo.zipCode
      });
    }
  }

  getCompany(searchText: string) {
    this.companyService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.companies = res.data.data;
          this.filteredCompanies = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
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

  onCompanyFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
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


  getBranchInfoDetail(branchInfoId: any) {
    if (!this.branchInfoId) return;
    this.branchInfoService.getbranchInfoDetail(branchInfoId).subscribe({
      next: (res: any) => {
        if (res) {
          this.branchInfo = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.branchInfoForm);
    if (this.branchInfoForm.invalid) {
      this.branchInfoForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.branchInfoFormValue = this.branchInfoForm.getRawValue();
    // console.log("save avater", this.avatar);
    // this.employeesForm.patchValue({avatar: this.avatar});
    this.formData = FormExtension.toFormData(this.branchInfoForm);
    console.log("save", this.branchInfoFormValue);

    debugger;
    if (this.branchInfoFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.branchInfoService.updatebranchInfoDetail(this.branchInfoFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/branch-info']);
        },
      });
    } else {
      this.branchInfoService.addbranchInfoDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['/branch-info']);
        },
      });
    }
  }

  reset(): void {
    this.branchInfoForm.reset(this.form.value);
  }

  clearState(): void {
    this.branchInfoForm.reset();
    this.branchInfoForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.branchInfoForm);
  }


}
