import {DataPassService} from "./../../../../core/services/data-pass.service";
import {environment} from "src/environments/environment";
import {Messages} from "./../../../../core/services/message/messages";
import {SweetAlertIcon} from "sweetalert2";
import {MessageService} from "./../../../../core/services/message/message.service";
import {FormExtension} from "./../../../../core/form/form-extension";
import {City} from "../../../model/configurations/city.model";
import {CityService} from "../../../service/configurations/city.service";
import {CountryService} from "../../../service/configurations/country.service";
import {StateService} from "../../../service/configurations/state.service";
import {SelectionModel} from "@angular/cdk/collections";
import {ENTER, COMMA} from "@angular/cdk/keycodes";
import {HttpClient} from "@angular/common/http";
import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormControl, FormBuilder, Validators, FormArray} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatListOption} from "@angular/material/list";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, Observable, Subject, switchMap} from "rxjs";
import {UserInformation} from "src/app/feature/model/user-information.model";
import {UserInformationService} from "src/app/feature/service/user.service";
import {State} from "../../enrollee/enrolle-entry/enrolle-entry.component";
import {Country} from "src/app/feature/model/configurations/country.model";
import {FileUploader} from "ng2-file-upload";
import {UploadModalComponent} from "src/app/shared/components/upload-modal/upload-modal.component";
import {FileHandler} from "src/app/core/services/file/file.handler";
import "src/app/core/form/form-extension";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import * as moment from "moment";

@Component({
  selector: "app-user-information-create-update",
  templateUrl: "./user-information-create-update.component.html",
  styleUrls: ["./user-information-create-update.component.scss"],
})
export class UserInformationCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/users.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  userInformationId: number;
  userInformationForm: FormGroup;
  userInformationFormValue: any;
  isEdit = false;
  avatar: any;
  avaterPreview: any;

  userInformation: UserInformation;
  branches: any;
  cities = [
    {value: 1, text: "Dhaka"},
    {value: 2, text: "Bhola"},
    {value: 3, text: "other"},
  ];
  // states = [
  //   {value: 1, text: "Dhaka"},
  //   {value: 2, text: "Chittagong"},
  //   {value: 3, text: "other"},
  // ];
  countryId: number;
  stateId: number;
  cityId: number;
  countries: Country[];
  filteredCountries: Country[];
  filterBranches: any;
 
  maritalStatuses = [
    {value: 1, text: "Single"},
    {value: 2, text: "Couple"},
    {value: 3, text: "Divorced"},
  ];
  religions =[
    {
      value:1, text:"Islam"
    },
    {
      value:2, text:"Hindu"
    },
    {
      value:3, text:"Other"
    }
  ]
  genders = [
    {value: 1, text: "Male"},
    {value: 2, text: "Female"},
    {value: 3, text: "Other"},
  ];

  catgoryAllComplete = false;
  categories = [
    {value: 1, text: "Technology", checked: false},
    {value: 2, text: "Language", checked: true},
    {value: 3, text: "other", checked: false},
  ];
  filteredLabels: Observable<string[]>;
  labels: string[] = ["Lemon"];
  allLables: string[] = ["Apple", "Lemon", "Lime", "Orange", "Strawberry"];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags = [
    {value: 1, text: "Tech", checked: false},
    {value: 2, text: "News", checked: true},
    {value: 3, text: "Music", checked: false},
    {value: 3, text: "Lang", checked: true},
    {value: 3, text: "Play", checked: false},
  ];
  relatedPosts = [];
  status: [];
  today = new Date();
  authors = [
    {id: 1, name: "Taslim"},
    {id: 2, name: "others"},
  ];
  filteredStates: State[];
  filteredCities: City[];
  stateCtrl = new FormControl();
  states: State[] = [
    {
      id: 1,
      name: "Arkansas",
      population: "2.978M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg",
    },
    {
      id: 2,
      name: "California",
      population: "39.14M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg",
    },
    {
      id: 3,
      name: "Florida",
      population: "20.27M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg",
    },
    {
      id: 4,
      name: "Texas",
      population: "27.47M",
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg",
    },
  ];
  selectedStates: State[] = [];
  private countrySubject: Subject<string> = new Subject<string>();
  private stateSubject: Subject<string> = new Subject<string>();
  private citySubject: Subject<string> = new Subject<string>();
  public uploader: FileUploader;
  uploadUrl: string;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["select", "firstname", "lastname", "email", "mobilenumber", "action"];
  dataSource = new MatTableDataSource<UserInformation>();
  selection = new SelectionModel<UserInformation>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public userInformationService: UserInformationService,
    public stateService: StateService,
    public countryService: CountryService,
    public cityService: CityService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userInformationForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.userInformationForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<UserInformation>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.userInformationId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.userInformationId;
    this.filterBranches = this.branches;
    this.userInformationForm = this.form;
    this.userInformationForm.patchValue({id: this.userInformationId});
    this.getUserInformationDetail(this.userInformationId);
    this.uploader = new FileUploader({});
    this.getCountry("");
    this.countrySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCountry(v)});
    this.stateSubject.pipe(debounceTime(1000)).subscribe({next: (stateName: string) => this.getState(this.countryId, stateName)});
    this.userInformationForm
      .get("countryId")
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe({
        next: (countryId: number) => {
          this.countryId = countryId;
          this.getState(countryId, "");
        },
      });
    this.userInformationForm
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
    if (!this.userInformationId) return;
    this.userInformationService.getUserInformationDetail(userInformationId).subscribe({
      next: (res: any) => {
        if (res) {
          this.userInformation = res.data;
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
      aboutMe: [],
      firstname: ["", [Validators.required, Validators.maxLength(50)]],
      lastname: ["", [Validators.required, Validators.maxLength(30)]],
      birthDate: [null, Validators.required],
      genderId: [1, Validators.required],
      maritalStatusId: [1],
      mobileNumber: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      countryId: [null],
      cityId: [null],
      stateId: [null],
      zipCode: [null],
      avatar: [null],

      street: [],
      avatarFile: [],

      nationalityId: [1],
      religion: [1],

      nationalIdentificationNumber: [],
      drivingLicenseNumber: [],
      passportNumber: [],

      fatherFirstname: [],
      fatherLastname: [],
      fatherContactNumber: [],
      motherFirstname: [],
      motherLastname: [],
      motherContactNumber: [],

      address1: [""],

      isTermsPolicy: [false, [Validators.required]],
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.userInformationForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        birthDate: user.birthDate,
        genderId: user.genderId,
        maritalStatusId: user.maritalStatusId,
        email: user.email,
        mobileNumber: user.mobileNumber,
        nationalIdentificationNumber: user.nationalIdentificationNumber,
        drivingLicenseNumber: user.drivingLicenseNumber,
        passportNumber: user.passportNumber,
        fatherFirstname: user.fatherFirstname,
        fatherLastname: user.fatherLastname,
        fatherContactNumber: user.fatherContactNumber,
        motherContactNumber: user.motherContactNumber,
        motherFirstname: user.motherFirstname,
        motherLastname: user.motherLastname,
        nationalityId: user.nationalityId,
        religionId: user.religionId,
        religionText: user.religionText,
        countryId: user.countryId,
        stateId: user.stateId,
        cityId: user.cityId,
        zipCode: user.zipCode,
        avatar: user.avatar,
        address1: user.address1
      });

      this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      this.avatar = user.avatar;
      console.log("path avater", this.avatar);
      console.log("path", user, this.userInformationForm.getRawValue());
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
    this.errors = FormExtension.getFormValidationErrors(this.userInformationForm);
    if (this.userInformationForm.invalid) {
      this.userInformationForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.userInformationFormValue = this.userInformationForm.getRawValue();
    console.log("save avater", this.avatar);
    this.userInformationForm.patchValue({avatar: this.avatar});
    this.formData = FormExtension.toFormData(this.userInformationForm);
    console.log("save", this.userInformationFormValue);

    debugger;
    if (this.userInformationFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.userInformationService.updateUserDetail(this.userInformationFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['user-information']);
        },
      });
    } else {
      this.userInformationService.addUserDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['user-information']);
        },
      });
    }
  }

  reset(): void {
    this.userInformationForm.reset(this.form.value);
  }

  clearState(): void {
    this.userInformationForm.reset();
    this.userInformationForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.userInformationForm);
  }

  avatarUpload($event: any): void {
    const files = $event.target.files;
    console.log(files);
    this.userInformationForm.patchValue({
      avatarFile: files[0],
    });
    this.userInformationForm.get("image")?.updateValueAndValidity();
    this.cd.markForCheck();
    console.log(this.userInformationForm);
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
    this.userInformationForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.userInformationForm.patchValue({
          avatarFile: file,
        });
        this.avatar = file;
        this.avaterPreview = reader.result as string;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => {};
    }

    console.log(this.userInformationForm);
    // reader.readAsDataURL(file)
  }
}
// https://dotnetthoughts.net/upload-files-dot-net-core-angular/
