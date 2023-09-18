import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobNewStatusListComponent } from './job-new-status-list.component';

describe('JobNewStatusListComponent', () => {
  let component: JobNewStatusListComponent;
  let fixture: ComponentFixture<JobNewStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobNewStatusListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobNewStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
