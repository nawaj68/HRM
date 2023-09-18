import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
//import { get } from 'http';
import { debounceTime, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Employees } from 'src/app/feature/model/employees.model';
import { FunctionalDesignation } from 'src/app/feature/model/functionalDesignation';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { FunctionaldesignationService } from 'src/app/feature/service/functionaldesignation.service';

@Component({
  selector: 'app-functionaldesignation-create-update',
  templateUrl: './functionaldesignation-create-update.component.html',
  styleUrls: ['./functionaldesignation-create-update.component.scss'],
})
export class FunctionaldesignationCreateUpdateComponent implements OnInit {
  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  functionalDesignationId: number;
  functionalDesignationForm: FormGroup;
  functionalDesignationFormValue: any;
  isEdit = false;
  functionalDesignation: FunctionalDesignation;

  employees: Employees[];
  filteredemployees: Employees[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private awardTypeSubjet: Subject<string> = new Subject<string>();

  @ViewChild('lableInput') labelInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ['remark', 'action'];

  dataSource = new MatTableDataSource<FunctionalDesignation>();
  selection = new SelectionModel<FunctionalDesignation>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public functionaldesignationService: FunctionaldesignationService,
    public employeeService: EmployeesService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params) =>
        (this.functionalDesignationId = params['id'] ? Number(params['id']) : 0)
    );
    this.isEdit = !!this.functionalDesignationId;
    this.functionalDesignationForm = this.form;
    this.functionalDesignationForm.patchValue({
      id: this.functionalDesignationId,
    });
    this.getFunctionaldesignationDetail(this.functionalDesignationId);
    this.getEmployees('');
    this.employeeSubjet
      .pipe(debounceTime(1000))
      .subscribe({ next: (v: string) => this.getEmployees(v) });
  }

  getFunctionaldesignationDetail(functionalDesignationId: any) {
    if (!this.functionalDesignationId) return;
    this.functionaldesignationService
      .getFunctionalDetail(functionalDesignationId)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.functionalDesignation = res.data;
            this.form = res.data;
          }
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  getEmployees(searchText: string) {
    this.employeeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredemployees = res.data.data;
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

  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      employeeId: [],
      remark: [''],
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.functionalDesignationForm.patchValue({
        id: user.id,
        userId: 1, //user.userId,
        employeeId: user.employeeId,
        remark: user.remark,
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(
      this.functionalDesignationForm
    );
    if (this.functionalDesignationForm.invalid) {
      this.functionalDesignationForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.functionalDesignationFormValue = this.functionalDesignationForm.getRawValue();
    //this.functionalDesignationForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.functionalDesignationForm);
    console.log('save', this.functionalDesignationFormValue);

    debugger;
    if (this.functionalDesignationFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.functionaldesignationService
        .updateFunctionalDetail(this.functionalDesignationFormValue.id, this.formData)
        .subscribe({
          next: (n: any) => {
            this.messageService.success(this.message.updateSuccess);
            // this.router.navigate(['employees']);
          },
        });
    } else {
      this.functionaldesignationService.addFunctionalDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          // this.router.navigate(['employees']);
        },
      });
    }
  }

  reset(): void {
    this.functionalDesignationForm.reset(this.form.value);
  }

  clearState(): void {
    this.functionalDesignationForm.reset();
    this.functionalDesignationForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.functionalDesignationForm);
  }

}
