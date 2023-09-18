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
import { debounce, debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Asset } from 'src/app/feature/model/asset.model';
import { AssetRequisition } from 'src/app/feature/model/assetRequisition.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { AssetRequisitionService } from 'src/app/feature/service/asset-requisition.service';
import { AssetService } from 'src/app/feature/service/asset.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';

@Component({
  selector: 'app-asset-requisition-create-update',
  templateUrl: './asset-requisition-create-update.component.html',
  styleUrls: ['./asset-requisition-create-update.component.scss']
})
export class AssetRequisitionCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/assetrequisition.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  assetRequisitionId: number;
  assetRequisitionForm: FormGroup;
  assetRequisitionFormValue: any;
  isEdit = false;
  assetRequisition: AssetRequisition;
  employeeId: number;
  assetId: number;
  employees: Employees[];
  filteredEmployees: Employees[];
  assets: Asset[];
  filteredAsset: Asset[];

  filteredLabels: Observable<string[]>;

  relatedPosts = [];
  status: [];
  today = new Date();
  
  stateCtrl = new FormControl();
  private employeesSubject: Subject<string> = new Subject<string>();
  private assetSubject: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["employeeId","assetId", "approvalDate", "remarks","action"];
  dataSource = new MatTableDataSource<AssetRequisition>();
  selection = new SelectionModel<AssetRequisition>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public assetRequisitionService: AssetRequisitionService,
    public employeesService: EmployeesService,
    public assetService: AssetService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) {}

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.assetRequisitionForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.assetRequisitionForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<AssetRequisition>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.assetRequisitionId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.assetRequisitionId;
    this.assetRequisitionForm = this.form;
    this.assetRequisitionForm.patchValue({id: this.assetRequisitionId});
    this.getAssetRequisitiontDetail(this.assetRequisitionId);
    this.getEmployee("");
    this.getAsset("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getEmployee(v)});
    this.assetSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getAsset(v)});
  }

  getAssetRequisitiontDetail(assetRequisitionId: any) {
    if (!this.assetRequisitionId) return;
    this.assetRequisitionService.getAssetRequisitionDetail(assetRequisitionId).subscribe({
      next: (res: any) => {
        if (res) {
          this.assetRequisition= res.data;
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
  onAssetFilter($event:any){
    const value = $event.target.value.toLocaleLowerCase().toString();
    this.assetSubject.next(value);
  }

  getAsset(searchText: string) {
    this.assetService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.assets = res.data.data;
          this.filteredAsset = res.data.data;
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
      assetId: [""],
      approvalById: [null, Validators.required],
      approvalDate: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.assetRequisitionForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        assetId: user.assetId,
        approvalById: user.approvalById,
        approvalDate: user.approvalDate,
        remarks: user.remarks,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.assetRequisitionForm);
    if (this.assetRequisitionForm.invalid) {
      this.assetRequisitionForm.markAllAsTouched();
      return;
    }

   
    this.assetRequisitionFormValue = this.assetRequisitionForm.getRawValue();
    this.formData = FormExtension.toFormData(this.assetRequisitionForm);
    console.log("save", this.assetRequisitionForm);

    if (this.assetRequisitionFormValue.id > 0) {

      this.assetRequisitionService.updateAssetRequisitionDetail(this.assetRequisitionFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/assetRequisition']);
        },
      });
    } else {
      this.assetRequisitionService.addAssetRequisitionDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/assetRequisition']);
        },
      });
    }
  }

  reset(): void {
    this.assetRequisitionForm.reset(this.form.value);
  }

  clearState(): void {
    this.assetRequisitionForm.reset();
    this.assetRequisitionForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.assetRequisitionForm);
  }
}
