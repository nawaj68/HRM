import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusCreateUpdateComponent } from './job-status-create-update.component';

describe('JobStatusCreateUpdateComponent', () => {
  let component: JobStatusCreateUpdateComponent;
  let fixture: ComponentFixture<JobStatusCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStatusCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
