import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesCreateUpdateComponent } from './employees-create-update.component';

describe('EmployeesCreateUpdateComponent', () => {
  let component: EmployeesCreateUpdateComponent;
  let fixture: ComponentFixture<EmployeesCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeesCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
