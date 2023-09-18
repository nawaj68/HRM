import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { HobbyType } from 'src/app/feature/model/hobbyType';
import { HobbyTypeService } from 'src/app/feature/service/hobby-type.service';

@Component({
  selector: 'app-hobby-type-create-update',
  templateUrl: './hobby-type-create-update.component.html',
  styleUrls: ['./hobby-type-create-update.component.scss']
})
export class HobbyTypeCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  hobbyTypeId: number;
  hobbyTypeForm: FormGroup;
  hobbyTypeFormValue: any;
  isEdit = false;
  hobbyType: HobbyType;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["hobbyTypeName","action"];

  dataSource = new MatTableDataSource<HobbyType>();
  selection = new SelectionModel<HobbyType>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public hobbyTypeService: HobbyTypeService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.hobbyTypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.hobbyTypeId;
    this.hobbyTypeForm = this.form;
    this.hobbyTypeForm.patchValue({ id: this.hobbyTypeId });
    this.getHobbyTypeDetail(this.hobbyTypeId);
  }

  getHobbyTypeDetail(hobbyTypeId: any) {
    if (!this.hobbyTypeId) return;
    this.hobbyTypeService.getHobbyTypeDetail(hobbyTypeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.hobbyType = res.data;
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
      //userId: [3],
      hobbyTypeName: []
    });
  }

  set form(hobbyType: any) {
    if (hobbyType !== null) {
      this.hobbyTypeForm.patchValue({
        id: hobbyType.id,
        //userId: 3,//user.userId,
        hobbyTypeName: hobbyType.hobbyTypeName

      });

      // this.avaterPreview = user.avatar ? `${environment.baseUrl+"/images/profiles"}/${user.avatar}` : "";
      // this.avatar = user.avatar;
      // console.log("path avater", this.avatar);
      // console.log("path", user, this.awardInfoForm.getRawValue());
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.hobbyTypeForm);
    if (this.hobbyTypeForm.invalid) {
      this.hobbyTypeForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.hobbyTypeFormValue = this.hobbyTypeForm.getRawValue();
    // console.log("save avater", this.avatar);
    // this.supervisorSetupForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.hobbyTypeForm);
    console.log("save", this.hobbyTypeFormValue);

    debugger;
    if (this.hobbyTypeFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.hobbyTypeService.updateHobbyTypeDetail(this.hobbyTypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['hobbyType']);
        },
      });
    } else {
      this.hobbyTypeService.addHobbyTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['hobbyType']);
        },
      });
    }
  }

  reset(): void {
    this.hobbyTypeForm.reset(this.form.value);
  }

  clearState(): void {
    this.hobbyTypeForm.reset();
    this.hobbyTypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.hobbyTypeForm);
  }

}
