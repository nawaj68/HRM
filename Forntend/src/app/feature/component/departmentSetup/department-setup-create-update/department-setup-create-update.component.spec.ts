import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSetupCreateUpdateComponent } from './department-setup-create-update.component';

describe('DepartmentSetupCreateUpdateComponent', () => {
  let component: DepartmentSetupCreateUpdateComponent;
  let fixture: ComponentFixture<DepartmentSetupCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSetupCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSetupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
