import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloodGroupCreateUpdateComponent } from './blood-group-create-update.component';

describe('BloodGroupCreateUpdateComponent', () => {
  let component: BloodGroupCreateUpdateComponent;
  let fixture: ComponentFixture<BloodGroupCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloodGroupCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BloodGroupCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
