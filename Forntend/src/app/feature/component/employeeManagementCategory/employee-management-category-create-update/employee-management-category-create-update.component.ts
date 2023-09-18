import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { EmployeeManagementCategory } from 'src/app/feature/model/employeeManagementCategory';
import { Employees } from 'src/app/feature/model/employees.model';
import { EmployeeManagementCategoryService } from 'src/app/feature/service/employee-management-category.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';

@Component({
  selector: 'app-employee-management-category-create-update',
  templateUrl: './employee-management-category-create-update.component.html',
  styleUrls: ['./employee-management-category-create-update.component.scss']
})
export class EmployeeManagementCategoryCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  employeeManagementCategoryId: number;
  employeeManagementCategoryForm: FormGroup;
  employeeManagementCategoryFormValue: any;
  isEdit = false;
  employeeManagementCategory: EmployeeManagementCategory;

  employees:Employees[];
  filteredemployees:Employees[];

  private employeeSubjet: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  today = new Date();

  displayedColumns: string[] = ["employeeId", "effectedDate", "remark","action"];

  dataSource = new MatTableDataSource<EmployeeManagementCategory>();
  selection = new SelectionModel<EmployeeManagementCategory>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public employeeManagementCategoryService: EmployeeManagementCategoryService,
    public employeeService:EmployeesService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.employeeManagementCategoryId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.employeeManagementCategoryId;
    this.employeeManagementCategoryForm = this.form;
    this.employeeManagementCategoryForm.patchValue({ id: this.employeeManagementCategoryId });
    this.getEmployeeManagementCategoryDetail(this.employeeManagementCategoryId);
    this.getEmployees("");
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
  }

  getEmployeeManagementCategoryDetail(employeeManagementCategoryId: any) {
    if (!this.employeeManagementCategoryId) return;
    this.employeeManagementCategoryService.getEmployeeManagementCategoryDetail(employeeManagementCategoryId).subscribe({
      next: (res: any) => {
        if (res) {
          this.employeeManagementCategory = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getEmployees(searchText: string){
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
      effectedDate:[""],
      remark:[""]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.employeeManagementCategoryForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        effectedDate: user.effectedDate,
        remark: user.remark

      });

      // this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      // this.avatar = user.avatar;
      // console.log("path avater", this.avatar);
      console.log("path", user, this.employeeManagementCategoryForm.getRawValue());
    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.employeeManagementCategoryForm);
    if (this.employeeManagementCategoryForm.invalid) {
      this.employeeManagementCategoryForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.employeeManagementCategoryFormValue = this.employeeManagementCategoryForm.getRawValue();
    // console.log("save avater", this.avatar);
    // this.supervisorSetupForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.employeeManagementCategoryForm);
    console.log("save", this.employeeManagementCategoryFormValue);

    debugger;
    if (this.employeeManagementCategoryFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.employeeManagementCategoryService.updateEmployeeManagementCategoryDetail(this.employeeManagementCategoryFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['employeeManagementCategory']);
        },
      });
    } else {
      this.employeeManagementCategoryService.addEmployeeManagementCategoryDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['employeeManagementCategory']);
        },
      });
    }
  }

  reset(): void {
    this.employeeManagementCategoryForm.reset(this.form.value);
  }

  clearState(): void {
    this.employeeManagementCategoryForm.reset();
    this.employeeManagementCategoryForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.employeeManagementCategoryForm);
  }


}
