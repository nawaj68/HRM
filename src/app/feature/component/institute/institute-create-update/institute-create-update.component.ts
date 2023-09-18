import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { CompanyInfo } from 'src/app/feature/model/companyinfo.model';
import { Institute } from 'src/app/feature/model/configurations/institute.model';

import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { InstituteService } from 'src/app/feature/service/configurations/institute.service';


@Component({
  selector: 'app-institute-create-update',
  templateUrl: './institute-create-update.component.html',
  styleUrls: ['./institute-create-update.component.scss']
})
export class InstituteCreateUpdateComponent implements OnInit {

  jsonUrl = "assets/data/grade.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  instituteId: number;
  instituteForm: FormGroup;
  instituteFormValue: any;
  isEdit = false;
  institute: Institute;
  companyId: number;
  company: CompanyInfo[];
  relatedPosts = [];
  today = new Date();

  filteredcompany: CompanyInfo[];
  deptCtrl = new FormControl();

  private companySubject: Subject<string> = new Subject<string>();
  
  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;
  
  tomorrow = new Date();
  
  displayedColumns: string[] = ["companyId","gradeName","gradePoint","action"];
  dataSource = new MatTableDataSource<Institute>();
  selection = new SelectionModel<Institute>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public instituteService: InstituteService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

    ngAfterViewInit(): void {
      this.load();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.instituteForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
        next: (v: any) => {
          let obj = {data: this.instituteForm.getRawValue(), errors: this.errors};
          this.dataPassService.setData(obj);
        },
      });
    }
    load(): any {
      return this.http.get(this.jsonUrl).subscribe((e: any) => {
        this.dataSource = new MatTableDataSource<Institute>(e);
      });
    }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.instituteId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.instituteId;
    this.instituteForm = this.form;
    this.instituteForm.patchValue({id: this.instituteId});
    this.getInstituteDetail(this.instituteId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getInstituteDetail(instituteId: any) {
    if (!this.instituteId) return;
    this.instituteService.getInstituteDetail(instituteId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.institute = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
  getCompany(searchText: string) {
    this.companyinfoService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.company = res.data.data;
          this.filteredcompany = res.data.data;
        }
      },
    });
  }
  get form(): any {
    return this.fb.group({
      id: [0], 
      companyId: [null],
      instituteName: ["",[Validators.required,Validators.maxLength(20)]],
      address: []
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.instituteForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        instituteName:user.instituteName,
        address:user.address
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.instituteForm);
    if (this.instituteForm.invalid) {
      this.instituteForm.markAllAsTouched();
      return;
    }

    this.instituteFormValue = this.instituteForm.getRawValue();
    this.formData = FormExtension.toFormData(this.instituteForm);
    console.log("save", this.instituteFormValue);

    debugger;
    if (this.instituteFormValue.id > 0) {
      this.instituteService.updateInstituteDetail(this.instituteFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['institute']);
        },
      });
    } else {
      this.instituteService.addInstituteDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['institute']);
        },
      });
    }
  }
  reset(): void {
    this.instituteForm.reset(this.form.value);
  }
  clearState(): void {
    this.instituteForm.reset();
    this.instituteForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.instituteForm);
  }

}
