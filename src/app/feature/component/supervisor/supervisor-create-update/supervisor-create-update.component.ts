import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
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
import { Employees } from 'src/app/feature/model/employees.model';
import { Supervisor } from 'src/app/feature/model/supervisor';
import { SupervisorSetup } from 'src/app/feature/model/supervisorsetup';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { SupervisorService } from 'src/app/feature/service/supervisor.service';
import { SupervisorsetupService } from 'src/app/feature/service/supervisorsetup.service';

@Component({
  selector: 'app-supervisor-create-update',
  templateUrl: './supervisor-create-update.component.html',
  styleUrls: ['./supervisor-create-update.component.scss']
})
export class SupervisorCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  suppervisorId: number;
  suppervisorForm: FormGroup;
  suppervisorFormValue: any;
  isEdit = false;
  suppervisor: Supervisor;

  employees:Employees[];
  filteredemployees:Employees[];

  suppervisorSetup:SupervisorSetup[];
  filteredsuppervisorSetup:SupervisorSetup[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private supervisorSetupSubjet: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["remark", "action"];

  dataSource = new MatTableDataSource<Supervisor>();
  selection = new SelectionModel<Supervisor>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public supervisorService: SupervisorService,
    public employeeService:EmployeesService,
    public supervisorsetupService: SupervisorsetupService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.suppervisorId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.suppervisorId;
    this.suppervisorForm = this.form;
    this.suppervisorForm.patchValue({ id: this.suppervisorId });
    this.getSuppervisorDetail(this.suppervisorId);
    this.getEmployees("");
    this.getsupervisorsetup("");
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.supervisorSetupSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getsupervisorsetup(v) });
  }

  getSuppervisorDetail(suppervisorId: any) {
    if (!this.suppervisorId) return;
    this.supervisorService.getSupervisorDetail(suppervisorId).subscribe({
      next: (res: any) => {
        if (res) {
          this.suppervisor = res.data;
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

  getsupervisorsetup(searchText: string){
    this.supervisorsetupService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.suppervisorSetup = res.data.data;
          this.filteredsuppervisorSetup = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onSuppervisorSetupFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.supervisorSetupSubjet.next(value);
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      employeeId: [],
      supervisorSetupId: [],
      remark:[""]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.suppervisorForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        supervisorSetupId: user.supervisorSetupId,
        remark: user.remark

      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.suppervisorForm);
    if (this.suppervisorForm.invalid) {
      this.suppervisorForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.suppervisorFormValue = this.suppervisorForm.getRawValue();
    //console.log("save avater", this.avatar);
    //this.bankInfoForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.suppervisorForm);
    console.log("save", this.suppervisorFormValue);

    debugger;
    if (this.suppervisorFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.supervisorService.updateSupervisorDetail(this.suppervisorFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['supervisor']);
        },
      });
    } else {
      this.supervisorService.addSupervisorDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['supervisor']);
        },
      });
    }
  }

  reset(): void {
    this.suppervisorForm.reset(this.form.value);
  }

  clearState(): void {
    this.suppervisorForm.reset();
    this.suppervisorForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.suppervisorForm);
  }


}
