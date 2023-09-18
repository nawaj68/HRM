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
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { LeaveType } from 'src/app/feature/model/configurations/leaveType.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { LeaveTypeService } from 'src/app/feature/service/configurations/leave-type.service';

@Component({
  selector: 'app-leave-type-create-update',
  templateUrl: './leave-type-create-update.component.html',
  styleUrls: ['./leave-type-create-update.component.scss']
})
export class LeaveTypeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/leavetype.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  leaveTypeId: number;
  leaveTypeForm: FormGroup;
  leaveTypeFormValue: any;
  isEdit = false;
  leaveType: LeaveType;
  comapnyId: number;
  company: CompanyInfo[];
  filteredCompanyInfo: CompanyInfo[];
 

  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private companySubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["companyId","leaveTypeName", "fullPayment", "halfPayment","action"];
  dataSource = new MatTableDataSource<LeaveType>();
  selection = new SelectionModel<LeaveType>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public leaveTypeService: LeaveTypeService,
    public companyinfoService: CompanyinfoService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.leaveTypeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.leaveTypeForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<LeaveType>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.leaveTypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.leaveTypeId;
    this.leaveTypeForm = this.form;
    this.leaveTypeForm.patchValue({id: this.leaveTypeId});
    this.getLeaveTypeDetail(this.leaveTypeId);
    this.getCompany("");
   
    this.companySubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getCompany(v)});
    
  }

  getLeaveTypeDetail(leaveTypeId: any) {
    if (!this.leaveTypeId) return;
    this.leaveTypeService.getLeaveTypeDetail(leaveTypeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.leaveType= res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  onCompanyFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.companySubject.next(value);
  }

  getCompany(searchText: string) {
    this.companyinfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.company = res.data.data;
          this.filteredCompanyInfo = res.data.data;
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
      companyId: ["",[Validators.required]],
      leaveTypeName: ["", [Validators.required]],
      fullPayment: [null, Validators.required],
      halfPayment: ["", [Validators.required]],
      isMeternal: [""],
      isUnpaid: [""],
      isPartialLeave: [""],
    
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.leaveTypeForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        companyId: user.companyId,
        leaveTypeName: user.leaveTypeName,
        fullPayment: user.fullPayment,
        halfPayment: user.halfPayment,
        isMeternal: user.isMeternal,
        isUnpaid: user.isUnpaid,
        isPartialLeave: user.isPartialLeave,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.leaveTypeForm);
    if (this.leaveTypeForm.invalid) {
      this.leaveTypeForm.markAllAsTouched();
      return;
    }

   
    this.leaveTypeFormValue = this.leaveTypeForm.getRawValue();
    this.formData = FormExtension.toFormData(this.leaveTypeForm);
    console.log("save", this.leaveTypeForm);

    if (this.leaveTypeFormValue.id > 0) {

      this.leaveTypeService.updateLeaveTypeDetail(this.leaveTypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/leaveType']);
        },
      });
    } else {
      this.leaveTypeService.addLeaveTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/leaveType']);
        },
      });
    }
  }

  reset(): void {
    this.leaveTypeForm.reset(this.form.value);
  }

  clearState(): void {
    this.leaveTypeForm.reset();
    this.leaveTypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.leaveTypeForm);
  }
}
