import { SelectionModel } from '@angular/cdk/collections';
import { U } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Proficiency } from 'src/app/feature/model/configurations/proficiency.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { Language } from 'src/app/feature/model/language.model';
import { ProficiencyService } from 'src/app/feature/service/configurations/proficiency.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { LanguageService } from 'src/app/feature/service/language.service';

@Component({
  selector: 'app-language-create-update',
  templateUrl: './language-create-update.component.html',
  styleUrls: ['./language-create-update.component.scss']
})
export class LanguageCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  language: Language;

  userId: number;
  languageId:number;
  languageForm:FormGroup;
  languageFormValue:any;

  employees:Employees[];
  filteredEmployees:Employees[];

  proficency:Proficiency[];
  filteredProficency:Proficiency[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private proficiencySubjet: Subject<string> = new Subject<string>();


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  // displayedColumns: string[] = ["languageName", "action"];
  dataSource = new MatTableDataSource<Language>();
  selection = new SelectionModel<Language>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public languageService: LanguageService,
    public employeeService: EmployeesService,
    public proficiencyService: ProficiencyService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.languageId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.languageId;
    this.languageForm = this.form;
    this.languageForm.patchValue({id: this.languageId});    
    this.getLanguageDetail(this.languageId);
    this.getEmployees("");
    this.getProficiency("")
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.proficiencySubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getProficiency(v) });
  }

  getEmployees(searchText: string){
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

  onEmployeeFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeeSubjet.next(value);
  }

  getProficiency(searchText: string){
    this.proficiencyService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.proficency = res.data.data;
          this.filteredProficency = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onProficiencyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.proficiencySubjet.next(value);
  }

  getLanguageDetail(languageId: any) {
    if (!this.languageId) return;
    this.languageService.getLanguageDetail(languageId).subscribe({
      next: (res: any) => {
        if (res) {
          this.language = res.data;
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
      id: [0],
      userId: [3],
      employeeId:[],
      proficencyId:[],
      languageName:["",[Validators.required]],
      remark:["",[Validators.required]]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.languageForm.patchValue({
        id: user.id,
        userId: 3,//user.userId,
        employeeId:user.employeeId,
        proficencyId:user.proficencyId,
        languageName:user.languageName,
        remark:user.remark
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.languageForm);
    if (this.languageForm.invalid) {
      this.languageForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.languageFormValue = this.languageForm.getRawValue();
    this.formData = FormExtension.toFormData(this.languageForm);
    console.log("save", this.languageFormValue);

    debugger;
    if (this.languageFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.languageService.updateLanguageDetail(this.languageFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['language']);
        },
      });
    } else {
      this.languageService.addLanguageDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['language']);
        },
      });
    }
  }

  reset(): void {
    this.languageForm.reset(this.form.value);
  }

  clearState(): void {
    this.languageForm.reset();
    this.languageForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.languageForm);
  }
}
