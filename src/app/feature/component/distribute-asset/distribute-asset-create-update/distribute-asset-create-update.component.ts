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
import { Asset } from 'src/app/feature/model/asset.model';
import { DistributeAsset } from 'src/app/feature/model/distributeAsset.model';
import { Employees } from 'src/app/feature/model/employees.model';
import { AssetService } from 'src/app/feature/service/asset.service';
import { DistributeAssetService } from 'src/app/feature/service/distribute-asset.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';

@Component({
  selector: 'app-distribute-asset-create-update',
  templateUrl: './distribute-asset-create-update.component.html',
  styleUrls: ['./distribute-asset-create-update.component.scss']
})
export class DistributeAssetCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/distributeasset.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  distributeAssetId: number;
  distributeAssetForm: FormGroup;
  distributeAssetFormValue: any;
  isEdit = false;
  distributeAsset: DistributeAsset;
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

  displayedColumns: string[] = ["employeeId","assetId","remarks","action"];
  dataSource = new MatTableDataSource<DistributeAsset>();
  selection = new SelectionModel<DistributeAsset>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public distributeAssetService: DistributeAssetService,
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
    this.distributeAssetForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.distributeAssetForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<DistributeAsset>(e);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.distributeAssetId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.distributeAssetId;
    this.distributeAssetForm = this.form;
    this.distributeAssetForm.patchValue({id: this.distributeAssetId});
    this.getDistributeAssetDetail(this.distributeAssetId);
    this.getEmployee("");
    this.getAsset("");
    this.employeesSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getEmployee(v)});
    this.assetSubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=>this.getAsset(v)});
   
  }

  getDistributeAssetDetail(distributeAssetId: any) {
    if (!this.distributeAssetId) return;
    this.distributeAssetService.getDistributeAssetDetail(distributeAssetId).subscribe({
      next: (res: any) => {
        if (res) {
          this.distributeAsset= res.data;
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
      assetId: ["",[Validators.required]],
      startdDate: [null, Validators.required],
      enddate: ["", [Validators.required]],
      remarks: ["", [Validators.required]],
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.distributeAssetForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        assetId: user.assetId,
        startdDate: user.startdDate,
        enddate: user.enddate,
        remarks: user.remarks,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.distributeAssetForm);
    if (this.distributeAssetForm.invalid) {
      this.distributeAssetForm.markAllAsTouched();
      return;
    }

   
    this.distributeAssetFormValue = this.distributeAssetForm.getRawValue();
    this.formData = FormExtension.toFormData(this.distributeAssetForm);
    console.log("save", this.distributeAssetForm);

    if (this.distributeAssetFormValue.id > 0) {

      this.distributeAssetService.updateDistributeAssetDetail(this.distributeAssetFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/distributeAsset']);
        },
      });
    } else {
      this.distributeAssetService.addDistributeAssetDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/distributeAsset']);
        },
      });
    }
  }

  reset(): void {
    this.distributeAssetForm.reset(this.form.value);
  }

  clearState(): void {
    this.distributeAssetForm.reset();
    this.distributeAssetForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.distributeAssetForm);
  }
}
