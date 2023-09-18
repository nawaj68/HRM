import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupListComponent } from './blood-group-list.component';

describe('BloodGroupListComponent', () => {
  let component: BloodGroupListComponent;
  let fixture: ComponentFixture<BloodGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodGroupListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
