import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form-create',
  templateUrl: './modal-form-create.component.html',
  styleUrls: ['./modal-form-create.component.scss']
})
export class ModalFormCreateComponent implements OnInit {

  userForm: FormGroup;
  submitForm: any;

  user: any;
  branches: any;
  cities = [{ value: 1, text: 'Dhaka' }, { value: 2, text: 'Bhola' }, { value: 3, text: 'other' }];
  states = [{ value: 1, text: 'Dhaka' }, { value: 2, text: 'Chittagong' }, { value: 3, text: 'other' }];
  countries = [{ value: 1, text: 'Bangladesh' }, { value: 2, text: 'Pakistan' }, { value: 3, text: 'other' }];;;
  filterBranches: any;

  maritalStatuses = [{ value: 1, text: 'Single' }, { value: 2, text: 'Couple' }, { value: 3, text: 'Divorced' }];
  genders = [{ value: 1, text: 'male' }, { value: 2, text: 'female' }, { value: 3, text: 'other' }];
  today = new Date();
  tomorrow = new Date();

  constructor(public dialogRef: MatDialogRef<ModalFormCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    this.user = this.data;
  }

  ngOnInit(): void {
    this.userForm = this.form;  // get form
    this.form = this.user;      // set form
    this.filterBranches = this.branches;
  }

  get form(): any {
    return this.fb.group({
      id: [null],
      firstname: ['', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      birthDate: [null, Validators.required],
      gender: [2, Validators.required],
      maritalStatus: [1],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      cityId: ['', [Validators.required]],
      stateId: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      designation: ['', Validators.required],
      branchId: [null],
      salary: [null, Validators.required],
      joinDate: [''],
      address1: [''],
      address2: [''],
      bankAccountNumber: [''],
      effectiveDate: [null, Validators.required],
      isTermsPolicy: [false, [Validators.required]]
    });
  }

  set form(user: any) {

    this.userForm.patchValue({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      birthDate: user.birthDate,
      gender: user.gender,
      maritalStatus: user.maritalStatus,
      mobileNumber: user.mobileNumber,
      email: user.email,
      designation: user.designation,
      joinDate: user.joinDate,
      salary: user.salary,
      branchId: user.branchId,
      bankAccountNumber: user.bankAccountNumber,
      effectiveDate: user.effectiveDate
    });
  }

  save(): void {
    console.log('form', this.userForm);
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('invalid form', this.userForm);
      return;
    }

    console.log('sumit valid');
    this.submitForm = this.userForm.getRawValue();
    if (this.submitForm.id > 0) {
      console.log('edit', this.submitForm, this.userForm);
    } else {
      console.log('add', this.submitForm, this.userForm);
    }
  }

  reset(): void {
    this.userForm.reset(this.form.value);
  }

  clearState(): void {
    this.userForm.reset();
    this.userForm.markAsUntouched();
  }

  onBranchFilter(branchName: string) {
    const value = branchName.toLocaleLowerCase().toString();
    this.filterBranches = this.branches.filter(
      (branch: any) =>
        `${branch.bank.name} ${branch.name} ${branch.routeTransitNumber}`
          .toLocaleLowerCase()
          .indexOf(value) !== -1
    );
  }

}
