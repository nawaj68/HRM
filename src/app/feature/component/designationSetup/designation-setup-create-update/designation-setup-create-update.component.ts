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
import { Designation } from 'src/app/feature/model/configurations/designation.model';
import { DesignationSetup } from 'src/app/feature/model/designationSetup.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { DesignationService } from 'src/app/feature/service/configurations/designation.service';
import { DesignationSetupService } from 'src/app/feature/service/designation-setup.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';

@Component({
  selector: 'app-designation-setup-create-update',
  templateUrl: './designation-setup-create-update.component.html',
  styleUrls: ['./designation-setup-create-update.component.scss']
})
export class DesignationSetupCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  designationSetup: DesignationSetup;

  userId: number;
  designationSetupId:number;
  designationSetupForm:FormGroup;
  designationSetupFormValue:any;

  employees:Employees[];
  filteredEmployees:Employees[];

  designations:Designation[];
  filteredDesignations:Designation[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private designationSubjet: Subject<string> = new Subject<string>();


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  // displayedColumns: string[] = ["designationSetupName", "action"];
  dataSource = new MatTableDataSource<DesignationSetup>();
  selection = new SelectionModel<DesignationSetup>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public designationSetupService: DesignationSetupService,
    public designationService: DesignationService,
    public employeeService: EmployeesService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.designationSetupId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.designationSetupId;
    this.designationSetupForm = this.form;
    this.designationSetupForm.patchValue({id: this.designationSetupId});    
    this.getDesignationSetupDetail(this.designationSetupId);
    this.getEmployees("");
    this.getDesignation("")
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.designationSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getDesignation(v) });
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
  getDesignation(searchText: string){
    this.designationService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredDesignations = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }
  
  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
  onDesignationFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeeSubjet.next(value);
  }
  getDesignationSetupDetail(designationSetupId: any) {
    if (!this.designationSetupId) return;
    this.designationSetupService.getDesignationSetupDetail(designationSetupId).subscribe({
      next: (res: any) => {
        if (res) {
          this.designationSetup = res.data;
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
      designationId:[],
      effectedDate:["",[Validators.required]],
      remark:["",[Validators.required]]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.designationSetupForm.patchValue({
        id: user.id,
        userId: 3,//user.userId,
        employeeId:user.employeeId,
        designationId:user.designationId,
        effectedDate:user.effectedDate,
        remark:user.remark
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.designationSetupForm);
    if (this.designationSetupForm.invalid) {
      this.designationSetupForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.designationSetupFormValue = this.designationSetupForm.getRawValue();
    this.formData = FormExtension.toFormData(this.designationSetupForm);
    console.log("save", this.designationSetupFormValue);

    debugger;
    if (this.designationSetupFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.designationSetupService.updateDesignationSetupDetail(this.designationSetupFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['designationSetup']);
        },
      });
    } else {
      this.designationSetupService.addDesignationSetupDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['designationSetup']);
        },
      });
    }
  }

  reset(): void {
    this.designationSetupForm.reset(this.form.value);
  }

  clearState(): void {
    this.designationSetupForm.reset();
    this.designationSetupForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.designationSetupForm);
  }

}
