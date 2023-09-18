import {UserInformation} from "./../../../model/user-information.model";
import {UserInformationService} from "./../../../service/user.service";
import {SelectionModel} from "@angular/cdk/collections";
import {HttpClient} from "@angular/common/http";
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatListOption} from "@angular/material/list";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, switchMap} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";

@Component({
  selector: "app-enrolle-entry",
  templateUrl: "./enrolle-entry.component.html",
  styleUrls: ["./enrolle-entry.component.scss"],
})
export class EnrolleEntryComponent implements AfterViewInit, OnInit {
  jsonUrl = "assets/data/users.data.json";

  userId: number;
  userInformationId: number;
  userInformationForm: FormGroup;
  submitForm: any;
  isEdit = false;

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
  countries = [
    {value: 1, text: "Bangladesh"},
    {value: 2, text: "Pakistan"},
    {value: 3, text: "other"},
  ];
  filterBranches: any;

  maritalStatuses = [
    {value: 1, text: "Single"},
    {value: 2, text: "Couple"},
    {value: 3, text: "Divorced"},
  ];
  genders = [
    {value: 1, text: "male"},
    {value: 2, text: "female"},
    {value: 3, text: "other"},
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
  filteredStates: Observable<State[]>;
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
    public userInformationService: UserInformationService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<UserInformation>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.userInformationId = Number(params["id"])));
    this.isEdit = !!this.userInformationId;
    this.filterBranches = this.branches;
    this.userInformationForm = this.form;
    this.userInformationForm.patchValue({userId: this.userInformationId});
    this.getUserInformationDetail(this.userInformationId);
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

  get form(): any {
    return this.fb.group({
      id: [null],
      userId: [null],
      aboutMe: [],
      firstname: ["", [Validators.required, Validators.maxLength(50)]],
      lastname: ["", [Validators.required, Validators.maxLength(30)]],
      birthDate: [null, Validators.required],
      gender: [2, Validators.required],
      maritalStatus: [1],
      mobileNumber: ["", [Validators.required]],
      email: ["", [Validators.email, Validators.required]],
      cityId: ["", [Validators.required]],
      stateId: ["", [Validators.required]],
      zip: ["", [Validators.required]],
      countryId: ["", [Validators.required]],
      street: [],

      nationality: [],
      religion: [],

      nid: [],
      drivingLicenseNumber: [],
      passportNumber: [],

      fatherFirstname: [],
      fatherLastname: [],
      fatherPhoneNumber: [],
      motherFirstname: [],
      motherLastname: [],
      motherPhoneNumber: [],
      relatedPosts: this.fb.array([
        this.fb.group({
          id: [null],
          title: [],
          createDateUtc: [],
          degree: [],
          institute: [],
          passingYear: [],
          score: [],
          outOfScore: [],
        }),
      ]),

      professionalQualitifications: this.fb.array([
        this.fb.group({
          id: [null],
          designation: [],
          organization: [],
          joiningDateUtc: [],
          endingDateUtc: [],
          responsibilities: [],
        }),
      ]),

      certifications: this.fb.array([
        this.fb.group({
          id: [null],
          title: [],
          institute: [],
          certificationYear: [],
          score: [],
        }),
      ]),

      designation: ["", Validators.required],
      branchId: [null],
      salary: [null, Validators.required],
      joinDate: [""],
      address1: [""],
      address2: [""],
      bankAccountNumber: [""],
      effectiveDate: [null, Validators.required],

      isPublish: [true, [Validators.required]],
      publishDate: ["", [Validators.email, Validators.required]],
      status: ["", [Validators.required]],
      categories: this.fb.array(this.categories.filter((e) => e.checked)),
      tags: this.fb.array(this.tags.filter((e) => e.checked)),
      labels: this.fb.array(this.labels),

      relatedPosts1: this.fb.array(this.selectedStates.map((e) => e.id)),
      isIncludePolicy: [false, [Validators.required]],
      authorId: [1],
      isTermsPolicy: [false, [Validators.required]],
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.userInformationForm.patchValue({
        id: user.id,
        userId: user.userId,
        firstname: user.firstname,
        lastname: user.lastname,
        birthDate: user.birthDate,
        gender: user.gender,
        maritalStatus: user.maritalStatus,
        mobileNumber: user.mobileNumber,
        email: user.email,
        designation: user.designation,
        joinDate: user.joinDate,
        salary: user.salary,
        branchId: user.branchId,
        bankAccountNumber: user.bankAccountNumber,
        effectiveDate: user.effectiveDate,
      });
    }
  }

  onBranchFilter(branchName: string) {
    const value = branchName.toLocaleLowerCase().toString();
    this.filterBranches = this.branches.filter(
      (branch: any) => `${branch.bank.name} ${branch.name} ${branch.routeTransitNumber}`.toLocaleLowerCase().indexOf(value) !== -1
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  save(): void {
    console.log("form", this.userInformationForm);
    // if (this.userInformationForm.invalid) {
    //   this.userInformationForm.markAllAsTouched();
    //   console.log("invalid form", this.userInformationForm);
    //   return;
    // }

    console.log("sumit valid");
    this.submitForm = this.userInformationForm.getRawValue();
    if (this.submitForm.id > 0) {
      this.userInformationService.updateUserDetail(this.submitForm.id, this.submitForm).subscribe({
        next: (n: any) => console.log(n),
        error: (e: any) => console.log(e)
      });
      console.log("edit", this.submitForm, this.userInformationForm);
    } else {
      console.log("add", this.submitForm, this.userInformationForm);
      this.userInformationService.addUserDetail(this.submitForm);
    }
  }

  reset(): void {
    this.userInformationForm.reset(this.form.value);
  }

  clearState(): void {
    this.userInformationForm.reset();
    this.userInformationForm.markAsUntouched();
  }

  add(): void {
    //this.user = null;
  }

  edit(element: any): void {
    this.userInformation = {...element};
    this.form = this.userInformation;
  }

  clone(element: any): void {
    this.userInformation = {...element};
    this.userInformation.id = 0;
    this.form = this.userInformation;
  }

  remove(element: any): void {}

  selected(event: MatAutocompleteSelectedEvent): void {
    this.labels.push(event.option.viewValue);
    this.labelInput.nativeElement.value = "";
  }

  private _filter(value: string): string[] {
    console.log(value);
    const filterValue = value.toLowerCase();

    return this.allLables.filter((fruit) => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserInformation): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row.id + 1}`;
  }

  onTagListChange(selectedOptions: MatListOption[]): void {
    // const tagArray = this.userInformationForm.controls.tags as FormArray;
    const tagArray = this.userInformationForm.get("tags") as FormArray;
    tagArray.clear();
    selectedOptions
      .map((o) => o.value)
      .forEach((e: any) => {
        tagArray.push(new FormControl(e));
      });
  }

  get categoryFormArray(): FormArray {
    // return this.userInformationForm.controls.categories as FormArray;
    return this.userInformationForm.get("categories") as FormArray;
  }

  setCategory(categories: any) {
    const countriesFGs = categories.map((category: any) => {
      // const obj = {}; obj[category] = true;
      return this.fb.group({
        value: category.value,
        text: category.text,
        checked: category.checked,
      });
    });

    const categoryFormArray = this.fb.array(countriesFGs);
    this.userInformationForm.setControl("categories", categoryFormArray);
  }

  categoryFormGroup = (element?: any): any => {
    if (element) {
      return this.fb.group({
        id: element.id,
      });
    }
  };

  addCategory(): void {
    this.categoryFormArray.insert(0, this.categoryFormGroup());
  }

  removeCategory(index: number): void {
    this.categoryFormArray.removeAt(index);
  }

  updateAllComplete(e: any, v: any) {
    v.checked = e.checked;
    this.checked(v);
  }

  checked(v: any, clear = false): any {
    this.catgoryAllComplete = this.categories != null && this.categories.every((t) => t.checked);

    const checkArray: FormArray = this.userInformationForm.get("categories") as FormArray;

    if (v.checked) {
      checkArray.push(new FormControl(v));
    } else {
      checkArray.controls.forEach((item: any, index: number) => {
        if (item.value.value === v.value) {
          checkArray.removeAt(index);
          return;
        }
      });
    }
  }

  someComplete(): boolean {
    if (this.categories == null) {
      return false;
    }
    return this.categories.filter((t) => t.checked).length > 0 && !this.catgoryAllComplete;
  }

  setAll(checked: boolean) {
    const checkArray: FormArray = this.userInformationForm.get("categories") as FormArray;
    checkArray.clear();
    this.catgoryAllComplete = checked;
    if (this.categories == null) {
      return;
    }
    this.categories.forEach((t) => {
      console.log(checked);
      t.checked = checked;
      this.checked(t);
    });
  }

  get relateduserInformationFormArray(): any {
    let cont = (this.userInformationForm.get("relatedPosts") as FormArray).controls;
    console.log(cont);
    return cont;
  }

  relateduserInformationFormGroup = (e?: any): FormGroup => {
    if (e) {
      return this.fb.group({
        id: [null],
        title: [""],
        // createDateUtc: [null],
      });
    }

    return this.fb.group({
      id: [null],
      title: [""],
      // createDateUtc: [null],
    });
  };

  addRelatedPost(): void {
    this.relateduserInformationFormArray.insert(0, this.relateduserInformationFormGroup());
  }

  removeRelatedPost(index: number): void {
    this.relateduserInformationFormArray.removeAt(index);
  }

  get professionalQualitificationFormArray(): any {
    return (this.userInformationForm.get("professionalQualitifications") as FormArray).controls;
  }

  professionalQualtificationFormGroup = (e?: any): FormGroup => {
    if (e) {
      return this.fb.group({
        id: [null],
        designation: [],
        organization: [],
        joiningDateUtc: [],
        endingDateUtc: [],
        responsibilities: [],
      });
    }

    return this.fb.group({
      id: [null],
      designation: [],
      organization: [],
      joiningDateUtc: [],
      endingDateUtc: [],
      responsibilities: [],
    });
  };

  addProfessionalQualification(): void {
    this.professionalQualitificationFormArray.insert(0, this.professionalQualtificationFormGroup());
  }

  removeProfessionalQualification(index: number): void {
    this.professionalQualitificationFormArray.removeAt(index);
  }

  get certificationFormArray(): any {
    return (this.userInformationForm.get("certifications") as FormArray).controls;
  }

  certificationsFormGroup = (e?: any): FormGroup => {
    if (e) {
      return this.fb.group({
        id: [null],
        title: [],
        institute: [],
        certificationYear: [],
        score: [],
      });
    }

    return this.fb.group({
      id: [null],
      title: [],
      institute: [],
      certificationYear: [],
      score: [],
    });
  };

  addCertification(): void {
    this.certificationFormArray.insert(0, this.certificationsFormGroup());
  }

  removeCertification(index: number): void {
    this.certificationFormArray.removeAt(index);
  }
}

export interface State {
  id: number;
  flag: string;
  name: string;
  population: string;
}

// intro
// about

// basic
//      id: [null],
//       firstname: ['', [Validators.required, Validators.maxLength(50)]],
//       lastname: ['', [Validators.required, Validators.maxLength(30)]],
//       birthDate: [null, Validators.required],
//       gender: [2, Validators.required],
// nationality
// religion
// Photo
// nid
// driving licese
// passport

// details
// father'name, email, mobile, address
// mother's name, email, mobile, address
// local address
// permanent address

//       maritalStatus: [1],
//       mobileNumber: ['', [Validators.required]],
//       email: ['', [Validators.email, Validators.required]],

//       cityId: ['', [Validators.required]],
//       stateId: ['', [Validators.required]],
//       zip: ['', [Validators.required]],
//       countryId: ['', [Validators.required]],

// educational
// Degreee
// Institute / College
// Marks
// Out of
// Passing Year

// professional
//       designation: ['', Validators.required],
//       branchId: [null],
//       salary: [null, Validators.required],
//       joinDate: [''],
//       address1: [''],
//       address2: [''],
//       bankAccountNumber: [''],
//       effectiveDate: [null, Validators.required],

// skills

// activities

// hobby

// isTermsPolicy: [false, [Validators.required]]
