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
import { Status } from 'src/app/feature/model/configurations/status.model';
import { StatusService } from 'src/app/feature/service/configurations/status.service';

@Component({
  selector: 'app-status-create-update',
  templateUrl: './status-create-update.component.html',
  styleUrls: ['./status-create-update.component.scss']
})
export class StatusCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  status: Status;

  userId: number;
  statusId:number;
  statusForm:FormGroup;
  statusFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["statusName", "action"];
  dataSource = new MatTableDataSource<Status>();
  selection = new SelectionModel<Status>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public statusService: StatusService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.statusId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.statusId;
    this.statusForm = this.form;
    this.statusForm.patchValue({id: this.statusId});    
    this.getStatusDetail(this.statusId);
  }
  getStatusDetail(statusId: any) {
    if (!this.statusId) return;
    this.statusService.getStatusDetail(statusId).subscribe({
      next: (res: any) => {
        if (res) {
          this.status = res.data;
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
      statusName:["",[Validators.required, Validators.maxLength(50)]]    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.statusForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        statusName:user.statusName
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.statusForm);
    if (this.statusForm.invalid) {
      this.statusForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.statusFormValue = this.statusForm.getRawValue();
    this.formData = FormExtension.toFormData(this.statusForm);
    console.log("save", this.statusFormValue);

    debugger;
    if (this.statusFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.statusService.updateStatusDetail(this.statusFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['status']);
        },
      });
    } else {
      this.statusService.addStatusDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['status']);
        },
      });
    }
  }

  reset(): void {
    this.statusForm.reset(this.form.value);
  }

  clearState(): void {
    this.statusForm.reset();
    this.statusForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.statusForm);
  }
}
