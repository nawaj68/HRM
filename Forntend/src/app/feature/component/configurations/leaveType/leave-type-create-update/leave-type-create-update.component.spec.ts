import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeCreateUpdateComponent } from './leave-type-create-update.component';

describe('LeaveTypeCreateUpdateComponent', () => {
  let component: LeaveTypeCreateUpdateComponent;
  let fixture: ComponentFixture<LeaveTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
