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
import { OpeningYear } from 'src/app/feature/model/configurations/openingYear.model';
import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { OpeningYearService } from 'src/app/feature/service/configurations/opening-year.service';

@Component({
  selector: 'app-opening-year-create-update',
  templateUrl: './opening-year-create-update.component.html',
  styleUrls: ['./opening-year-create-update.component.scss']
})
export class OpeningYearCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/openingyear.data.json";
  
  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  openingYearId: number;
  openingYearForm: FormGroup;
  openingYearFormValue: any;
  isEdit = false;
  openingYear: OpeningYear;
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

  displayedColumns: string[] = ["companyId","openingYearNumber","action"];
  dataSource = new MatTableDataSource<OpeningYear>();
  selection = new SelectionModel<OpeningYear>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public openingYearService: OpeningYearService,
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
    this.openingYearForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.openingYearForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<OpeningYear>(e);
    });
  }
 
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.openingYearId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.openingYearId;
    this.openingYearForm = this.form;
    this.openingYearForm.patchValue({id: this.openingYearId});
    this.getOpeningYearDetail(this.openingYearId);
    this.getCompany("");
   
    this.companySubject.pipe(debounceTime(1000)).subscribe({next:(v:string)=> this.getCompany(v)});
    
  }

  getOpeningYearDetail(openingYearId: any) {
    if (!this.openingYearId) return;
    this.openingYearService.getOpeningYearDetail(openingYearId).subscribe({
      next: (res: any) => {
        if (res) {
          this.openingYear= res.data;
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
      openingYearNumber: ["", [Validators.required]],
      openingDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      closingYear: ["", [Validators.required]],
      
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.openingYearForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        companyId: user.companyId,
        openingYearNumber: user.openingYearNumber,
        openingDate: user.openingDate,
        endDate: user.endDate,
        closingYear: user.closingYear,
        
      });

    }
  }

  dateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
  }
 

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.openingYearForm);
    if (this.openingYearForm.invalid) {
      this.openingYearForm.markAllAsTouched();
      return;
    }

   
    this.openingYearFormValue = this.openingYearForm.getRawValue();
    this.formData = FormExtension.toFormData(this.openingYearForm);
    console.log("save", this.openingYearForm);

    if (this.openingYearFormValue.id > 0) {

      this.openingYearService.updateOpeningYearDetail(this.openingYearFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['/openingYear']);
        },
      });
    } else {
      this.openingYearService.addOpeningYearDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          //this.reset();
          this.router.navigate(['/openingYear']);
        },
      });
    }
  }

  reset(): void {
    this.openingYearForm.reset(this.form.value);
  }

  clearState(): void {
    this.openingYearForm.reset();
    this.openingYearForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.openingYearForm);
  }
}



