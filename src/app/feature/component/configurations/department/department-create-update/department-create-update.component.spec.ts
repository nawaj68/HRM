import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentCreateUpdateComponent } from './department-create-update.component';

describe('DepartmentCreateUpdateComponent', () => {
  let component: DepartmentCreateUpdateComponent;
  let fixture: ComponentFixture<DepartmentCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
