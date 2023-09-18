import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBaseStatusCreateUpdateComponent } from './job-base-status-create-update.component';

describe('JobBaseStatusCreateUpdateComponent', () => {
  let component: JobBaseStatusCreateUpdateComponent;
  let fixture: ComponentFixture<JobBaseStatusCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBaseStatusCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBaseStatusCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
