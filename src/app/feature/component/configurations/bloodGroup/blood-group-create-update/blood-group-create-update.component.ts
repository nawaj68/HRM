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
import { BloodGroup } from 'src/app/feature/model/configurations/bloodgroup.model';
import { BloodgroupService } from 'src/app/feature/service/configurations/bloodgroup.service';


@Component({
  selector: 'app-blood-group-create-update',
  templateUrl: './blood-group-create-update.component.html',
  styleUrls: ['./blood-group-create-update.component.scss']
})
export class BloodGroupCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  bloodgroup: BloodGroup;

  userId: number;
  bloodgroupId:number;
  bloodgroupForm:FormGroup;
  bloodgroupFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["bloodGroupName", "action"];
  dataSource = new MatTableDataSource<BloodGroup>();
  selection = new SelectionModel<BloodGroup>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public bloodgroupService: BloodgroupService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.bloodgroupId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.bloodgroupId;
    this.bloodgroupForm = this.form;
    this.bloodgroupForm.patchValue({id: this.bloodgroupId});    
    this.getBloodGroupDetail(this.bloodgroupId);

  }

  getBloodGroupDetail(bloodgroupId: any) {
    if (!this.bloodgroupId) return;
    this.bloodgroupService.getBloodGroupDetail(bloodgroupId).subscribe({
      next: (res: any) => {
        if (res) {
          this.bloodgroup = res.data;
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
      bloodGroupName:["",[Validators.required, Validators.maxLength(50)]]    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.bloodgroupForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        bloodGroupName:user.bloodGroupName
      });
    }
  }
  

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.bloodgroupForm);
    if (this.bloodgroupForm.invalid) {
      this.bloodgroupForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.bloodgroupFormValue = this.bloodgroupForm.getRawValue();
    this.formData = FormExtension.toFormData(this.bloodgroupForm);
    console.log("save", this.bloodgroupFormValue);

    debugger;
    if (this.bloodgroupFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.bloodgroupService.updateBloodGroupDetail(this.bloodgroupFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['bloodGroup']);
        },
      });
    } else {
      this.bloodgroupService.addBloodGroupDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['bloodGroup']);
        },
      });
    }
  }

  reset(): void {
    this.bloodgroupForm.reset(this.form.value);
  }

  clearState(): void {
    this.bloodgroupForm.reset();
    this.bloodgroupForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.bloodgroupForm);
  }
  

}
