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
import { Proficiency } from 'src/app/feature/model/configurations/proficiency.model';
import { ProficiencyService } from 'src/app/feature/service/configurations/proficiency.service';

@Component({
  selector: 'app-proficiency-create-update',
  templateUrl: './proficiency-create-update.component.html',
  styleUrls: ['./proficiency-create-update.component.scss']
})
export class ProficiencyCreateUpdateComponent implements OnInit {

  message = Messages;
  errors: any;
  formData: any;
  isEdit = false;

  proficiency: Proficiency;

  userId: number;
  proficiencyId:number;
  proficiencyForm:FormGroup;
  proficiencyFormValue:any;


  @ViewChild("lableInput") labelInput: ElementRef<HTMLInputElement>;
  @ViewChild("auto") matAutocomplete: MatAutocomplete;

  displayedColumns: string[] = ["proficiencyName", "action"];
  dataSource = new MatTableDataSource<Proficiency>();
  selection = new SelectionModel<Proficiency>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public proficiencyService: ProficiencyService,
    private fileHandler: FileHandler,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private dataPassService: DataPassService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.proficiencyId = params["id"] ? Number(params["id"]) : 0));
    this.isEdit = !!this.proficiencyId;
    this.proficiencyForm = this.form;
    this.proficiencyForm.patchValue({id: this.proficiencyId});    
    this.getProficiencyDetail(this.proficiencyId);
  }
  getProficiencyDetail(proficiencyId: any) {
    if (!this.proficiencyId) return;
    this.proficiencyService.getProficiencyDetail(proficiencyId).subscribe({
      next: (res: any) => {
        if (res) {
          this.proficiency = res.data;
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
      proficiencyName:["",[Validators.required, Validators.maxLength(50)]]    
    });
  }

  set form(user: any) {
    if (user !== null) {
      this.proficiencyForm.patchValue({
        id: user.id,
        userId: 1,//user.userId,
        proficiencyName:user.proficiencyName
      });
    }
  }

  save(): void {
    this.errors = FormExtension.getFormValidationErrors(this.proficiencyForm);
    if (this.proficiencyForm.invalid) {
      this.proficiencyForm.markAllAsTouched();
      return;
    }

    //   this.userInformationForm.patchValue({
    //     birthDate: this.userInformationForm.get('birthDate')?.value.toISOString()
    // });
    this.proficiencyFormValue = this.proficiencyForm.getRawValue();
    this.formData = FormExtension.toFormData(this.proficiencyForm);
    console.log("save", this.proficiencyFormValue);

    debugger;
    if (this.proficiencyFormValue.id > 0) {
      // this.userInformationService.updateUserDetailWithFile(this.submitForm.id, this.submitForm, this.avatar).subscribe({
      //   next: (n: any) => console.log(n),
      //   error: (e: any) => console.log(e),
      // });

      this.proficiencyService.updateProficiencyDetail(this.proficiencyFormValue.id, this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.updateSuccess);
          this.router.navigate(['proficiency']);
        },
      });
    } else {
      this.proficiencyService.addProficiencyDetail(this.formData).subscribe({
        next: (n: any) => {
          this.messageService.success(this.message.saveSucess);
          this.router.navigate(['proficiency']);
        },
      });
    }
  }

  reset(): void {
    this.proficiencyForm.reset(this.form.value);
  }

  clearState(): void {
    this.proficiencyForm.reset();
    this.proficiencyForm.markAsUntouched();
    FormExtension.markAllAsUntoched(this.proficiencyForm);
  }

}
