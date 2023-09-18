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
import { Designation } from 'src/app/feature/model/configurations/designation.model';
import { DesignationService } from 'src/app/feature/service/configurations/designation.service';

@Component({
  selector: 'app-designation-create-update',
  templateUrl: './designation-create-update.component.html',
  styleUrls: ['./designation-create-update.component.scss']
})
export class DesignationCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  designation: Designation;

  userId: number;
  designationId:number;
  designationForm:FormGroup;
  designationFormValue:any;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["name","action"];
  dataSource = new MatTableDataSource<Designation>();
  selection = new SelectionModel<Designation>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public designationService: DesignationService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.designationId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.designationId;
    this.designationForm = this.form;
    this.designationForm.patchValue({id: this.designationId});    
    this.getDesignationDetail(this.designationId);
    
  }

  getDesignationDetail(designationId: any) {
    if (!this.designationId) return;
    this.designationService.getDesignationDetail(designationId).subscribe({
      next: (res: any) => {
        if (res) {
          this.designation = res.data;
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
      this.designationForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        name:user.name,
        designationId:user.designationId
      });
    }
  }
  

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.designationForm);
    if (this.designationForm.invalid) {
      this.designationForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.designationFormValue = this.designationForm.getRawValue();
    this.formData = FormExtension.toFormData(this.designationForm);
    console.log("save", this.designationFormValue);

    debugger;
    if (this.designationFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.designationService.updateDesignationDetail(this.designationFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['designation']);
        },
      });
    } else {
      this.designationService.addDesignationDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['designation']);
        },
      });
    }
  }

  reset(): void {
    this.designationForm.reset(this.form.value);
  }

  clearState(): void {
    this.designationForm.reset();
    this.designationForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.designationForm);
  }
}
