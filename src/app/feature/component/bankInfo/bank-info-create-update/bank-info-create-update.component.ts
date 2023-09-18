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
import { BankInfo } from 'src/app/feature/model/bank-info';
import { BranchInfo } from 'src/app/feature/model/branchInfo.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { BankInfoService } from 'src/app/feature/service/bank-info.service';
import { BranchInfoService } from 'src/app/feature/service/branch-info.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';

@Component({
  selector: 'app-bank-info-create-update',
  templateUrl: './bank-info-create-update.component.html',
  styleUrls: ['./bank-info-create-update.component.scss']
})
export class BankInfoCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  bankInfoId: number;
  bankInfoForm: FormGroup;
  bankInfoFormValue: any;
  isEdit = false;
  bankInfo: BankInfo;

  employees:Employees[];
  filteredemployees:Employees[];

  branchInfo:BranchInfo[];
  filteredbranchInfo:BranchInfo[];

  private employeeSubjet: Subject<string> = new Subject<string>();
  private branchInfoSubjet: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["accountName", "accountNumber", "routingNumber","remark", "action"];

  dataSource = new MatTableDataSource<BankInfo>();
  selection = new SelectionModel<BankInfo>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public bankInfoService: BankInfoService,
    public employeeService:EmployeesService,
    public branchInfoService: BranchInfoService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.bankInfoId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.bankInfoId;
    this.bankInfoForm = this.form;
    this.bankInfoForm.patchValue({ id: this.bankInfoId });
    this.getBankInfoDetail(this.bankInfoId);
    this.getEmployees("");
    this.getbranchInfo("");
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    this.branchInfoSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getbranchInfo(v) });
  }

  getBankInfoDetail(bankInfoId: any) {
    if (!this.bankInfoId) return;
    this.bankInfoService.getBankInfoDetail(bankInfoId).subscribe({
      next: (res: any) => {
        if (res) {
          this.bankInfo = res.data;
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

  getbranchInfo(searchText: string){
    this.branchInfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.branchInfo = res.data.data;
          this.filteredbranchInfo = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });
  }

  onBranchInfoFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.branchInfoSubjet.next(value);
  }

  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      employeeId: [],
      branchId: [],
      accountName: ["", [Validators.required]],
      accountNumber: ["", Validators.required],
      routingNumber: ["", Validators.required],
      remark:[""]
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.bankInfoForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        branchId: user.branchId,
        accountName: user.accountName,
        accountNumber: user.accountNumber,
        routingNumber: user.routingNumber,
        remark: user.remark

      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.bankInfoForm);
    if (this.bankInfoForm.invalid) {
      this.bankInfoForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.bankInfoFormValue = this.bankInfoForm.getRawValue();
    //console.log("save avater", this.avatar);
    //this.bankInfoForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.bankInfoForm);
    console.log("save", this.bankInfoFormValue);

    debugger;
    if (this.bankInfoFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.bankInfoService.updateBankInfoDetail(this.bankInfoFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['bankInfo']);
        },
      });
    } else {
      this.bankInfoService.addBankInfoDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['bankInfo']);
        },
      });
    }
  }

  reset(): void {
    this.bankInfoForm.reset(this.form.value);
  }

  clearState(): void {
    this.bankInfoForm.reset();
    this.bankInfoForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.bankInfoForm);
  }


}
