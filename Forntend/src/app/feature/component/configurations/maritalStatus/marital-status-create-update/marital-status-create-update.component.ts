import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { MaritalStatus } from 'src/app/feature/model/configurations/maritalStatus.model';
import { MaritalStatusService } from 'src/app/feature/service/configurations/marital-status.service';

@Component({
  selector: 'app-marital-status-create-update',
  templateUrl: './marital-status-create-update.component.html',
  styleUrls: ['./marital-status-create-update.component.scss']
})
export class MaritalStatusCreateUpdateComponent implements OnInit {
  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  maritalStatus: MaritalStatus;

  userId: number;
  maritalStatusId:number;
  maritalStatusForm:FormGroup;
  maritalStatusFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["maritalStatusName", "action"];
  dataSource = new MatTableDataSource<MaritalStatus>();
  selection = new SelectionModel<MaritalStatus>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public maritalStatusService: MaritalStatusService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.maritalStatusId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.maritalStatusId;
    this.maritalStatusForm = this.form;
    this.maritalStatusForm.patchValue({id: this.maritalStatusId});    
    this.getMaritalStatusDetail(this.maritalStatusId);
  }
  getMaritalStatusDetail(maritalStatusId: any) {
    if (!this.maritalStatusId) return;
    this.maritalStatusService.getMaritalStatusDetail(maritalStatusId).subscribe({
      next: (res: any) => {
        if (res) {
          this.maritalStatus = res.data;
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
      maritalStatusName:["",[Validators.required, Validators.maxLength(50)]]    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.maritalStatusForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        maritalStatusName:user.maritalStatusName
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.maritalStatusForm);
    if (this.maritalStatusForm.invalid) {
      this.maritalStatusForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.maritalStatusFormValue = this.maritalStatusForm.getRawValue();
    this.formData = FormExtension.toFormData(this.maritalStatusForm);
    console.log("save", this.maritalStatusFormValue);

    debugger;
    if (this.maritalStatusFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.maritalStatusService.updateMaritalStatusDetail(this.maritalStatusFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['maritalStatus']);
        },
      });
    } else {
      this.maritalStatusService.addMaritalStatusDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['maritalStatus']);
        },
      });
    }
  }

  reset(): void {
    this.maritalStatusForm.reset(this.form.value);
  }

  clearState(): void {
    this.maritalStatusForm.reset();
    this.maritalStatusForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.maritalStatusForm);
  }


}
