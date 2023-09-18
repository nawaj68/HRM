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
import { NewApprovalWorkflow } from 'src/app/feature/model/configurations/newApprovalWorkflow.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { NewApprovalWorkflowService } from 'src/app/feature/service/configurations/new-approval-workflow.service';

@Component({
  selector: 'app-new-approval-workflow-create-update',
  templateUrl: './new-approval-workflow-create-update.component.html',
  styleUrls: ['./new-approval-workflow-create-update.component.scss']
})
export class NewApprovalWorkflowCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/newapprovalworkflow.data.json";

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  newApprovalWorkflowId: number;
  newApprovalWorkflowForm: FormGroup;
  newApprovalWorkflowFormValue: any;
  isEdit = false;
  newApprovalWorkflow: NewApprovalWorkflow;
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

  displayedColumns: string[] = ["companyId","newApprovalWorkflowName", "remarks","action"];
  dataSource = new MatTableDataSource<NewApprovalWorkflow>();
  selection = new SelectionModel<NewApprovalWorkflow>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public newApprovalWorkflowService: NewApprovalWorkflowService,
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
    this.newApprovalWorkflowForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.newApprovalWorkflowForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<NewApprovalWorkflow>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.newApprovalWorkflowId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.newApprovalWorkflowId;
    this.newApprovalWorkflowForm = this.form;
    this.newApprovalWorkflowForm.patchValue({id: this.newApprovalWorkflowId});
    this.getNewApprovalWorkflowDetail(this.newApprovalWorkflowId);
    this.getCompany("");
   
    this.companySubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getCompany(v)});
    
  }

  getNewApprovalWorkflowDetail(newApprovalWorkflowId: any) {
    if (!this.newApprovalWorkflowId) return;
    this.newApprovalWorkflowService.getNewApprovalWorkflowDetail(newApprovalWorkflowId).subscribe({
      next: (res: any) => {
        if (res) {
          this.newApprovalWorkflow= res.data;
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
      newApprovalWorkflowName: ["", [Validators.required]],
      remarks: [null, Validators.required],
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.newApprovalWorkflowForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        companyId: user.companyId,
        newApprovalWorkflowName: user.newApprovalWorkflowName,
        remarks: user.remarks,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.newApprovalWorkflowForm);
    if (this.newApprovalWorkflowForm.invalid) {
      this.newApprovalWorkflowForm.markAllAsTouched();
      return;
    }

   
    this.newApprovalWorkflowFormValue = this.newApprovalWorkflowForm.getRawValue();
    this.formData = FormExtension.toFormData(this.newApprovalWorkflowForm);
    console.log("save", this.newApprovalWorkflowForm);

    if (this.newApprovalWorkflowFormValue.id > 0) {

      this.newApprovalWorkflowService.updateNewApprovalWorkflowDetail(this.newApprovalWorkflowFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/newApprovalWorkflow']);
        },
      });
    } else {
      this.newApprovalWorkflowService.addNewApprovalWorkflowDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/newApprovalWorkflow']);
        },
      });
    }
  }

  reset(): void {
    this.newApprovalWorkflowForm.reset(this.form.value);
  }

  clearState(): void {
    this.newApprovalWorkflowForm.reset();
    this.newApprovalWorkflowForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.newApprovalWorkflowForm);
  }
}

