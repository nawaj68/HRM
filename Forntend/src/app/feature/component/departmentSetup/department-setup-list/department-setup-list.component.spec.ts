import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSetupListComponent } from './department-setup-list.component';

describe('DepartmentSetupListComponent', () => {
  let component: DepartmentSetupListComponent;
  let fixture: ComponentFixture<DepartmentSetupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSetupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
