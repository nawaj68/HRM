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
import { EducationGroup } from 'src/app/feature/model/configurations/educationgroup.model';
import { EducationType } from 'src/app/feature/model/configurations/educationtype.model';
import { Grade } from 'src/app/feature/model/configurations/grade.model';
import { Institute } from 'src/app/feature/model/configurations/institute.model';
import { Education } from 'src/app/feature/model/education.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { EducationgroupService } from 'src/app/feature/service/configurations/educationgroup.service';
import { EducationtypeService } from 'src/app/feature/service/configurations/educationtype.service';
import { GradeService } from 'src/app/feature/service/configurations/grade.service';
import { InstituteService } from 'src/app/feature/service/configurations/institute.service';
import { EducationService } from 'src/app/feature/service/education.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';

@Component({
  selector: 'app-education-create-update',
  templateUrl: './education-create-update.component.html',
  styleUrls: ['./education-create-update.component.scss']
})
export class EducationCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/education.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  educationId: number;
  educationForm: FormGroup;
  educationFormValue: any;
  isEdit = false;
  education: Education;
  employeeId: number;
  egucationGroupId: number;
  educationTypeId: number;
  gradeId: number;
  instituteId: number;
  employees: Employees[];
  filteredEmployees: Employees[];
  educationGroups: EducationGroup[];
  filteredEducationGroup: EducationGroup[];
  educationTypes: EducationType[];
  filteredEducationType: EducationType[];
  grades: Grade[];
  filteredGrade: Grade[];
  institutes: Institute[];
  filteredInstitute: Institute[];


  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private employeesSubject: Subject<string> = new Subject<string>();
  private educationGroupsSubject: Subject<string> = new Subject<string>();
  private educationTypesSubject: Subject<string> = new Subject<string>();
  private gradesSubject: Subject<string> = new Subject<string>();
  private institutesSubject: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["employeeId","egucationGroupId", "gradeId", "result","action"];
  dataSource = new MatTableDataSource<Education>();
  selection = new SelectionModel<Education>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public educationService: EducationService,
    public employeesService: EmployeesService,
    public educationGroupService: EducationgroupService,
    public educationTypeService: EducationtypeService,
    public gradeService: GradeService,
    public instituteService: InstituteService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}
  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.educationForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.educationForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Education>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.educationId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.educationId;
    this.educationForm = this.form;
    this.educationForm.patchValue({id: this.educationId});
    this.getEducationDetail(this.educationId);
    this.getEmployee("");
    this.getEducationgroup("");
    this.getEducationType("");
    this.getGrade("");
    this.getInstitute("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getEmployee(v)});
    this.educationGroupsSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getEducationgroup(v)});
    this.educationTypesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getEducationType(v)});
    this.gradesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getGrade(v)});
    this.institutesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getInstitute(v)});
  }

  getEducationDetail(educationId: any) {
    if (!this.educationId) return;
    this.educationService.getEducationDetail(educationId).subscribe({
      next: (res: any) => {
        if (res) {
          this.education= res.data;
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
  onEducationgroupFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.educationGroupsSubject.next(value);
  }

  getEducationgroup(searchText: string) {
    this.educationGroupService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.educationGroups = res.data.data;
          this.filteredEducationGroup = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  onEducationTypeFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.educationTypesSubject.next(value);
  }

  getEducationType(searchText: string) {
    this.educationTypeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.educationTypes = res.data.data;
          this.filteredEducationType = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  onGradeFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.gradesSubject.next(value);
  }

  getGrade(searchText: string) {
    this.gradeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.grades = res.data.data;
          this.filteredGrade = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onInstituteFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.institutesSubject.next(value);
  }

  getInstitute(searchText: string) {
    this.instituteService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.institutes = res.data.data;
          this.filteredInstitute = res.data.data;
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
      egucationGroupId: ["", Validators.required],
      educationTypeId: ["", Validators.required],
      gradeId: ["", [Validators.required]],
      passingYear: ["", [Validators.required]],
      result: ["", Validators.required],
      scale: ["", [Validators.required]],
      instituteId: ["", [Validators.required]],
      foreignDegree: ["", [Validators.required]],
      professionalDegree: ["", [Validators.required]],
      lastEducation: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.educationForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        egucationGroupId: user.egucationGroupId,
        educationTypeId: user.educationTypeId,
        gradeId: user.gradeId,
        passingYear: user.passingYear,
        result: user.result,
        scale: user.scale,
        instituteId: user.instituteId,
        foreignDegree: user.foreignDegree,
        professionalDegree: user.professionalDegree,
        lastEducation: user.lastEducation,
        remarks: user.remarks,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.educationForm);
    if (this.educationForm.invalid) {
      this.educationForm.markAllAsTouched();
      return;
    }

   
    this.educationFormValue = this.educationForm.getRawValue();
    this.formData = FormExtension.toFormData(this.educationForm);
    console.log("save", this.educationForm);

    if (this.educationFormValue.id > 0) {

      this.educationService.updateEducationDetail(this.educationFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/education']);
        },
      });
    } else {
      this.educationService.addEducationDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/education']);
        },
      });
    }
  }

  reset(): void {
    this.educationForm.reset(this.form.value);
  }

  clearState(): void {
    this.educationForm.reset();
    this.educationForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.educationForm);
  }
}

