import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Department } from 'src/app/feature/model/configurations/department.model';
import { Designation } from 'src/app/feature/model/configurations/designation.model';
import { DepartmentService } from 'src/app/feature/service/configurations/department.service';
import { DesignationService } from 'src/app/feature/service/configurations/designation.service';

@Component({
  selector: 'app-department-create-update',
  templateUrl: './department-create-update.component.html',
  styleUrls: ['./department-create-update.component.scss']
})
export class DepartmentCreateUpdateComponent implements OnInit {

  
  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  department: Department;

  userId: number;
  departmentId:number;
  departmentForm:FormGroup;
  departmentFormValue:any;

  designation: Designation[];
  filteredDesignation: Designation[];

  private designationSubject: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["name","code","currency","flag","action"];
  dataSource = new MatTableDataSource<Department>();
  selection = new SelectionModel<Department>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public departmentService: DepartmentService,
    public designationService: DesignationService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.departmentId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.departmentId;
    this.departmentForm = this.form;
    this.departmentForm.patchValue({id: this.departmentId});    
    this.getDepartmentDetail(this.departmentId);
    this.getDesignation("");
    this.designationSubject.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getDesignation(v) });
  }

  getDesignation(searchText: string) {
    this.designationService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.designation = res.data.data;
          this.filteredDesignation = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onDesignationFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.designationSubject.next(value);
  }

  getDepartmentDetail(departmentId: any) {
    if (!this.departmentId) return;
    this.departmentService.getDepartmentDetail(departmentId).subscribe({
      next: (res: any) => {
        if (res) {
          this.department = res.data;
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
      userId: [1],
      name:["",[Validators.required, Validators.maxLength(50)]],
      designationId:[]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.departmentForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        name:user.name,
        designationId:user.designationId
      });
    }
  }
  

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.departmentForm);
    if (this.departmentForm.invalid) {
      this.departmentForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.departmentFormValue = this.departmentForm.getRawValue();
    this.formData = FormExtension.toFormData(this.departmentForm);
    console.log("save", this.departmentFormValue);

    debugger;
    if (this.departmentFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.departmentService.updateDepartmentDetail(this.departmentFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['department']);
        },
      });
    } else {
      this.departmentService.addDepartmentDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['department']);
        },
      });
    }
  }

  reset(): void {
    this.departmentForm.reset(this.form.value);
  }

  clearState(): void {
    this.departmentForm.reset();
    this.departmentForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.departmentForm);
  }


}
