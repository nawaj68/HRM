import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagementCategoryListComponent } from './employee-management-category-list.component';

describe('EmployeeManagementCategoryListComponent', () => {
  let component: EmployeeManagementCategoryListComponent;
  let fixture: ComponentFixture<EmployeeManagementCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeManagementCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
