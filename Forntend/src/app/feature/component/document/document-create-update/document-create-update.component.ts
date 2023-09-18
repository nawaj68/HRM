import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { debounceTime, Subject } from 'rxjs';
import { FormExtension } from 'src/app/core/form/form-extension';
import { DataPassService } from 'src/app/core/services/data-pass.service';
import { FileHandler } from 'src/app/core/services/file/file.handler';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Messages } from 'src/app/core/services/message/messages';
import { Employees } from 'src/app/feature/model/employees.model';
import { DocumentTypeService } from 'src/app/feature/service/document-type.service';
import { DocumentService } from 'src/app/feature/service/document.service';
import { EmployeesService } from 'src/app/feature/service/employees.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-document-create-update',
  templateUrl: './document-create-update.component.html',
  styleUrls: ['./document-create-update.component.scss']
})
export class DocumentCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;

  userId: number;
  documentId: number;
  documentForm: FormGroup;
  documentFormValue: any;
  isEdit = false;
  avatar: any;
  avaterPreview: any;
  document: Document;

  employees:Employees[];
  filteredemployees:Employees[];

  // documentType:DocumentType[];
  // filteredeocumentType:DocumentType[];

  public uploader: FileUploader;
  uploadUrl: string;

  private employeeSubjet: Subject<string> = new Subject<string>();
  //private documentTypeSubjet: Subject<string> = new Subject<string>();

  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  tomorrow = new Date();

  displayedColumns: string[] = ["avatar", "remark", "action"];

  dataSource = new MatTableDataSource<Document>();
  selection = new SelectionModel<Document>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public documentService: DocumentService,
    public employeeService:EmployeesService,
    //public documentTypeService:DocumentTypeService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.documentId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.documentId;
    this.documentForm = this.form;
    this.documentForm.patchValue({ id: this.documentId });
    this.getDocumentDetail(this.documentId);
    this.getEmployees("");
    //this.getDocumentType("");
    this.employeeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getEmployees(v) });
    // this.documentTypeSubjet.pipe(debounceTime(1000)).subscribe({ next: (v: string) => this.getDocumentType(v) });
    this.uploader = new FileUploader({});
  }

  getDocumentDetail(documentId: any) {
    if (!this.documentId) return;
    this.documentService.getDocumentDetail(documentId).subscribe({
      next: (res: any) => {
        if (res) {
          this.document = res.data;
          this.form = res.data;
        }
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  getEmployees(searchText: string){
    this.employeeService.getDropdown(0, 10, searchText).subscribe({
      next: (res: any) => {
        if (res) {
          this.employees = res.data.data;
          this.filteredemployees = res.data.data;
        }
      },
      // error: (error: any) => {
      //   console.error(error);
      // },
    });

  }
  onEmployeeFilter($event: any) {
    const value = $event.target.value.toLocaleLowerCase().toString();

    this.employeeSubjet.next(value);
  }

  // getDocumentType(searchText: string){
  //   this.documentTypeService.getDropdown(0, 10, searchText).subscribe({
  //     next: (res: any) => {
  //       if (res) {
  //         this.documentType = res.data.data;
  //         this.filteredeocumentType= res.data.data;
  //       }
  //     },
  //     // error: (error: any) => {
  //     //   console.error(error);
  //     // },
  //   });
  // }

  // onDocumentTypeFilter($event: any) {
  //   const value = $event.target.value.toLocaleLowerCase().toString();

  //   this.documentTypeSubjet.next(value);
  // }

  
  get form(): any {
    return this.fb.group({
      id: [0],
      userId: [1],
      employeeId: [],
      avatar: [null],
      //documentTypeId:[],
      avatarFile: [],
      remark:[""]

    });
  }

  set form(user: any) {
    if (user !== null) {
      this.documentForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        employeeId: user.employeeId,
        //documentTypeId:user.documentTypeId,
        avatar: user.avater,
        remark: user.remark

      });

      this.avaterPreview = user.avatar ? `${environment.baseUrl}/${user.avatar}` : "";
      this.avatar = user.avatar;
      console.log("path avater", this.avatar);
      console.log("path", user, this.documentForm.getRawValue());
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.documentForm);
    if (this.documentForm.invalid) {
      this.documentForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.documentFormValue = this.documentForm.getRawValue();
    console.log("save avater", this.avatar);
    this.documentForm.patchValue({ avatar: this.avatar });
    this.formData = FormExtension.toFormData(this.documentForm);
    console.log("save", this.documentFormValue);

    debugger;
    if (this.documentFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.documentService.updateDocumentDetail(this.documentFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['document']);
        },
      });
    } else {
      this.documentService.addDocumentDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['document']);
        },
      });
    }
  }

  reset(): void {
    this.documentForm.reset(this.form.value);
  }

  clearState(): void {
    this.documentForm.reset();
    this.documentForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.documentForm);
  }

  avatarUpload($event: any): void {
    const files = $event.target.files;
    console.log(files);
    this.documentForm.patchValue({
      avatarFile: files[0],
    });
    this.documentForm.get("image")?.updateValueAndValidity();
    this.cd.markForCheck();
    console.log(this.documentForm);
    this.uploader.setOptions({
      url: this.uploadUrl,
    });

    if (files.length === 0 || files == null) {
    }
    const file = files[0];

    if (file.size === 0) {
    }

    if (!this.fileHandler.fileValidate(file)) {
      this.uploader.clearQueue();
      return;
    }
  }

  uploadFileAttach($event: any) {
    const reader = new FileReader();
    const file = $event.target.files[0];
    console.log(file);
    this.documentForm.get("image")?.updateValueAndValidity();
    // this.cd.markForCheck();
    if ($event.target.files && $event.target.files.length) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.documentForm.patchValue({
          avatarFile: file,
        });
        this.avatar = file;
        this.avaterPreview = reader.result as string;

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
      reader.onerror = () => { };
    }

    console.log(this.documentForm);
    // reader.readAsDataURL(file)
  }




}
