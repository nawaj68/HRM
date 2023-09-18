import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagementCategoryCreateUpdateComponent } from './employee-management-category-create-update.component';

describe('EmployeeManagementCategoryCreateUpdateComponent', () => {
  let component: EmployeeManagementCategoryCreateUpdateComponent;
  let fixture: ComponentFixture<EmployeeManagementCategoryCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeManagementCategoryCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManagementCategoryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
