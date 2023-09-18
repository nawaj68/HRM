import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitForm: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.form;
  }

  get form(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberme: [false],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitForm = this.loginForm.getRawValue();
  }
}
