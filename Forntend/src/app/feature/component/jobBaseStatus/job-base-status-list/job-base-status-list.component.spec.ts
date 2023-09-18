import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobBaseStatusListComponent } from './job-base-status-list.component';

describe('JobBaseStatusListComponent', () => {
  let component: JobBaseStatusListComponent;
  let fixture: ComponentFixture<JobBaseStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobBaseStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobBaseStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
