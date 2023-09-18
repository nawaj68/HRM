import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatusListComponent } from './job-status-list.component';

describe('JobStatusListComponent', () => {
  let component: JobStatusListComponent;
  let fixture: ComponentFixture<JobStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
