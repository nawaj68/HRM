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
import { DocumentTypeService } from 'src/app/feature/service/document-type.service';

@Component({
  selector: 'app-document-type-create-update',
  templateUrl: './document-type-create-update.component.html',
  styleUrls: ['./document-type-create-update.component.scss']
})
export class DocumentTypeCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  documentTypeId: number;
  documentTypeForm: FormGroup;
  documentTypeFormValue: any;
  isEdit = false;
  documentType: DocumentType;

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["documentTypeName","action"];

  dataSource = new MatTableDataSource<DocumentType>();
  selection = new SelectionModel<DocumentType>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public documentTypeService: DocumentTypeService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.documentTypeId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.documentTypeId;
    this.documentTypeForm = this.form;
    this.documentTypeForm.patchValue({ id: this.documentTypeId });
    this.getDocumentTypeDetail(this.documentTypeId);
  }

  getDocumentTypeDetail(documentTypeId: any) {
    if (!this.documentTypeId) return;
    this.documentTypeService.getDocumentTypeDetail(documentTypeId).subscribe({
      next: (res: any) => {
        if (res) {
          this.documentType = res.data;
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
      documentTypeName: []
    });
  }

  set form(documentType: any) {
    if (documentType !== null) {
      this.documentTypeForm.patchValue({
        id: documentType.id,
        //userId: 3,//user.userId,
        documentTypeName: documentType.documentTypeName

      });

      // this.avaterPreview = user.avatar ? `${environment.baseUrl+"/images/profiles"}/${user.avatar}` : "";
      // this.avatar = user.avatar;
      // console.log("path avater", this.avatar);
      // console.log("path", user, this.awardInfoForm.getRawValue());
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.documentTypeForm);
    if (this.documentTypeForm.invalid) {
      this.documentTypeForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.documentTypeFormValue = this.documentTypeForm.getRawValue();
    // console.log("save avater", this.avatar);
    // this.supervisorSetupForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.documentTypeForm);
    console.log("save", this.documentTypeFormValue);

    debugger;
    if (this.documentTypeFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.documentTypeService.updateDocumentTypeDetail(this.documentTypeFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['documentType']);
        },
      });
    } else {
      this.documentTypeService.addDocumentTypeDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['documentType']);
        },
      });
    }
  }

  reset(): void {
    this.documentTypeForm.reset(this.form.value);
  }

  clearState(): void {
    this.documentTypeForm.reset();
    this.documentTypeForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.documentTypeForm);
  }


}
