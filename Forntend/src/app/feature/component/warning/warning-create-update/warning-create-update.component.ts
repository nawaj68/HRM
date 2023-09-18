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
import { Employees } from 'src/app/feature/model/employees.model';
import { Warning } from 'src/app/feature/model/warning.model';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { WarningService } from 'src/app/feature/service/warning.service';

@Component({
  selector: 'app-warning-create-update',
  templateUrl: './warning-create-update.component.html',
  styleUrls: ['./warning-create-update.component.scss']
})
export class WarningCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/warning.data.json";
  
  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  warningId: number;
  warningForm: FormGroup;
  warningFormValue: any;
  isEdit = false;
  warning: Warning;
  employeeId: number;
  warningByEmployeeId: number;
  employees: Employees[];
  filteredEmployees: Employees[];


  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private employeesSubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["employeeId","warningDate", "warningType", "warningDetails","action"];
  dataSource = new MatTableDataSource<Warning>();
  selection = new SelectionModel<Warning>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public warningService: WarningService,
    public employeesService: EmployeesService,
   
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.warningForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.warningForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Warning>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.warningId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.warningId;
    this.warningForm = this.form;
    this.warningForm.patchValue({id: this.warningId});
    this.getWarningDetail(this.warningId);
    this.getEmployee("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getEmployee(v)});
  }

  getWarningDetail(warningId: any) {
    if (!this.warningId) return;
    this.warningService.getWarningDetail(warningId).subscribe({
      next: (res: any) => {
        if (res) {
          this.warning= res.data;
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

  get form(): any {
    return this.fb.group({
      id: [0], 
      userId: [1],
      employeeId: ["",[Validators.required]],
      warningByEmployeeId: ["", [Validators.required]],
      warningDate: [null, Validators.required],
      warningType: ["", [Validators.required]],
      warningDetails: ["", [Validators.required]],
      remarks: ["", Validators.required],
      action: ["", Validators.required],
    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.warningForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        warningByEmployeeId: user.warningByEmployeeId,
        warningDate: user.warningDate,
        warningType: user.warningType,
        warningDetails: user.warningDetails,
        remarks: user.remarks,
        action: user.action,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.warningForm);
    if (this.warningForm.invalid) {
      this.warningForm.markAllAsTouched();
      return;
    }

    this.warningFormValue = this.warningForm.getRawValue();
    this.formData = FormExtension.toFormData(this.warningForm);
    console.log("save", this.warningForm);

    if (this.warningFormValue.id > 0) {
      
      this.warningService.updateWarningDetail(this.warningFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/warning']);
        },
      });
    } else {
      this.warningService.addWarningDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/warning']);
        },
      });
    }
  }

  reset(): void {
    this.warningForm.reset(this.form.value);
  }

  clearState(): void {
    this.warningForm.reset();
    this.warningForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.warningForm);
  }
}

