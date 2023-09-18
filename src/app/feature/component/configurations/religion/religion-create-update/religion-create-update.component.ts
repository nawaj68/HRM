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
import { Religion } from 'src/app/feature/model/configurations/religision.model';
import { ReligionService } from 'src/app/feature/service/configurations/religion.service';

@Component({
  selector: 'app-religion-create-update',
  templateUrl: './religion-create-update.component.html',
  styleUrls: ['./religion-create-update.component.scss']
})
export class ReligionCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  religion: Religion;

  userId: number;
  religionId:number;
  religionForm:FormGroup;
  religionFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["religionName", "action"];
  dataSource = new MatTableDataSource<Religion>();
  selection = new SelectionModel<Religion>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public religionService: ReligionService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.religionId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.religionId;
    this.religionForm = this.form;
    this.religionForm.patchValue({id: this.religionId});    
    this.getReligionDetail(this.religionId);
  }
  getReligionDetail(religionId: any) {
    if (!this.religionId) return;
    this.religionService.getReligionDetail(religionId).subscribe({
      next: (res: any) => {
        if (res) {
          this.religion = res.data;
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
      religionName:["",[Validators.required, Validators.maxLength(50)]]    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.religionForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        religionName:user.religionName
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.religionForm);
    if (this.religionForm.invalid) {
      this.religionForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.religionFormValue = this.religionForm.getRawValue();
    this.formData = FormExtension.toFormData(this.religionForm);
    console.log("save", this.religionFormValue);

    debugger;
    if (this.religionFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.religionService.updateReligionDetail(this.religionFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['religion']);
        },
      });
    } else {
      this.religionService.addReligionDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['religion']);
        },
      });
    }
  }

  reset(): void {
    this.religionForm.reset(this.form.value);
  }

  clearState(): void {
    this.religionForm.reset();
    this.religionForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.religionForm);
  }
}
