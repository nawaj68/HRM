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
import { Gender } from 'src/app/feature/model/configurations/gender.model';
import { GenderService } from 'src/app/feature/service/configurations/gender.service';

@Component({
  selector: 'app-gender-create-update',
  templateUrl: './gender-create-update.component.html',
  styleUrls: ['./gender-create-update.component.scss']
})
export class GenderCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  gender: Gender;

  userId: number;
  genderId:number;
  genderForm:FormGroup;
  genderFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["genderName", "action"];
  dataSource = new MatTableDataSource<Gender>();
  selection = new SelectionModel<Gender>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public genderService: GenderService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.genderId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.genderId;
    this.genderForm = this.form;
    this.genderForm.patchValue({id: this.genderId});    
    this.getGenderDetail(this.genderId);
  }
  getGenderDetail(genderId: any) {
    if (!this.genderId) return;
    this.genderService.getGenderDetail(genderId).subscribe({
      next: (res: any) => {
        if (res) {
          this.gender = res.data;
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
      genderName:["",[Validators.required, Validators.maxLength(50)]]    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.genderForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        genderName:user.genderName
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.genderForm);
    if (this.genderForm.invalid) {
      this.genderForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.genderFormValue = this.genderForm.getRawValue();
    this.formData = FormExtension.toFormData(this.genderForm);
    console.log("save", this.genderFormValue);

    debugger;
    if (this.genderFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.genderService.updateGenderDetail(this.genderFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['gender']);
        },
      });
    } else {
      this.genderService.addGenderDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['gender']);
        },
      });
    }
  }

  reset(): void {
    this.genderForm.reset(this.form.value);
  }

  clearState(): void {
    this.genderForm.reset();
    this.genderForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.genderForm);
  }

}
