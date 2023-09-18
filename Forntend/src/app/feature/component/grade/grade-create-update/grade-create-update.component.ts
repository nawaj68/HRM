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
import { Grade } from 'src/app/feature/model/configurations/grade.model';

import { CompanyinfoService } from 'src/app/feature/service/companyinfo.service';
import { GradeService } from 'src/app/feature/service/configurations/grade.service';


@Component({
  selector: 'app-grade-create-update',
  templateUrl: './grade-create-update.component.html',
  styleUrls: ['./grade-create-update.component.scss']
})
export class GradeCreateUpdateComponent implements OnInit {
  jsonUrl = "assets/data/grade.data.json";
  message = Messages;
  errors: any;
  formData: any;
  
  userId: number;
  gradeId: number;
  gradeForm: FormGroup;
  gradeFormValue: any;
  isEdit = false;
  grade: Grade;
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
  dataSource = new MatTableDataSource<Grade>();
  selection = new SelectionModel<Grade>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public gradeService: GradeService,
    public companyinfoService: CompanyinfoService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.gradeForm.valueChanges.pipe(distinctUntilChanged()).subscribe({
      next: (v: any) => {
        let obj = {data: this.gradeForm.getRawValue(), errors: this.errors};
        this.dataPassService.setData(obj);
      },
    });
  }
  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<Grade>(e);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.gradeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.gradeId;
    this.gradeForm = this.form;
    this.gradeForm.patchValue({id: this.gradeId});
    this.getGradeDetail(this.gradeId);
    this.getCompany("");
    this.companySubject.pipe(debounceTime(1000)).subscribe({next: (v: string) => this.getCompany(v)});
  }
  getGradeDetail(gradeId: any) {
    if (!this.gradeId) return;
    this.gradeService.getGradeDetail(gradeId).subscribe({
      next: (res: any) => {
        
        if (res) {
          this.grade = res.data;
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
      gradeName: ["",[Validators.required,Validators.maxLength(20)]],
      gradePoint: []
    });
  }
  set form(user: any) {
    if (user !== null) {
      this.gradeForm.patchValue({
        id: user.id,
        companyId:user.companyId,
        gradeName:user.gradeName,
        gradePoint:user.gradePoint
       
      });
    }
  }
  onCompanyFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.companySubject.next(value);
  }
  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.gradeForm);
    if (this.gradeForm.invalid) {
      this.gradeForm.markAllAsTouched();
      return;
    }

    this.gradeFormValue = this.gradeForm.getRawValue();
    this.formData = FormExtension.toFormData(this.gradeForm);
    console.log("save", this.gradeFormValue);

    debugger;
    if (this.gradeFormValue.id > 0) {
      this.gradeService.updateGradeDetail(this.gradeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['grade']);
        },
      });
    } else {
      this.gradeService.addGradeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['grade']);
        },
      });
    }
  }
  reset(): void {
    this.gradeForm.reset(this.form.value);
  }
  clearState(): void {
    this.gradeForm.reset();
    this.gradeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.gradeForm);
  }

}
