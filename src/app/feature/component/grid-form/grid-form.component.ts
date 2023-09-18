import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { UserInformation } from '../../model/user-information.model';

@Component({
  selector: 'app-grid-form',
  templateUrl: './grid-form.component.html',
  styleUrls: ['./grid-form.component.scss']
})
export class GridFormComponent implements AfterViewInit, OnInit {

  jsonUrl = 'assets/data/users.data.json';


  userForm: FormGroup;
  submitForm: any;

  user: UserInformation;
  branches: any;
  cities = [{ value: 1, text: 'Dhaka' }, { value: 2, text: 'Bhola' }, { value: 3, text: 'other' }];
  states = [{ value: 1, text: 'Dhaka' }, { value: 2, text: 'Chittagong' }, { value: 3, text: 'other' }];
  countries = [{ value: 1, text: 'Bangladesh' }, { value: 2, text: 'Pakistan' }, { value: 3, text: 'other' }];;;
  filterBranches: any;

  maritalStatuses = [{ value: 1, text: 'Single' }, { value: 2, text: 'Couple' }, { value: 3, text: 'Divorced' }];
  genders = [{ value: 1, text: 'male' }, { value: 2, text: 'female' }, { value: 3, text: 'other' }];
  today = new Date();
  tomorrow = new Date();

  displayedColumns: string[] = ['select', 'firstname', 'lastname', 'email', 'mobilenumber', 'action'];
  dataSource = new MatTableDataSource<UserInformation>();
  selection = new SelectionModel<UserInformation>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(public http: HttpClient, public fb: FormBuilder) {

  }

  ngAfterViewInit(): void {
    this.load();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  load(): any {
    return this.http.get(this.jsonUrl).subscribe((e: any) => {
      this.dataSource = new MatTableDataSource<UserInformation>(e);
    });
  }

  ngOnInit(): void {
    this.userForm = this.form;  // get form
    // this.form = this.user;      // set form
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
    if (user !== null) {
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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  add(): void {
    //this.user = null;
  }

  edit(element: any): void {
    this.user = { ...element };
    this.form = this.user;
  }

  clone(element: any): void {
    this.user = { ...element };
    this.user.id = 0;
    this.form = this.user;
  }

  remove(element: any): void { }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserInformation): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
