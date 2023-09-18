import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {
  submitForm: any;
  maritalStatuses= [{ value: 1, text: 'Single' }, { value: 2, text: 'Couple' }, { value: 3, text: 'Divorced' }];
  genders = [{ value: 1, text: 'male' }, { value: 2, text: 'female' }, { value: 3, text: 'other' }];
  city = [];
  state = [];
  country = [];
  today = new Date();
  basicForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.basicForm = this.form;
  }

  get form(): FormGroup {
    return this.fb.group({
      id: [null],
      firstname: ['my name', [Validators.required, Validators.maxLength(50)]],
      lastname: ['', [Validators.required, Validators.maxLength(30)]],
      birthDate: [null],
      gender: [2, Validators.required],
      maritalStatus: [1],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      address1: [''],
      address2: [''],
      isTermsPolicy: [false]
    });
  }

  save(): void {
    console.log('form', this.basicForm);
    if (this.basicForm.invalid) {
      this.basicForm.markAllAsTouched();
      console.log('invalid form', this.basicForm);
      return;
    }

    console.log('sumit valid');
    this.submitForm = this.basicForm.getRawValue();
    if (this.submitForm.id > 0) {
      console.log('edit', this.submitForm, this.basicForm);
    } else {
      console.log('add', this.submitForm, this.basicForm);
    }
  }

  reset(): void {
   this.basicForm.reset(this.form.value);
  }

  clearState(): void{
    this.basicForm.reset();
    this.basicForm.markAsUntouched();
  }

  markFormPristine(form: FormGroup | NgForm): void {
    Object.keys(form.controls).forEach(control => {
      form.controls[control].setErrors(null);
    });
  }
}
