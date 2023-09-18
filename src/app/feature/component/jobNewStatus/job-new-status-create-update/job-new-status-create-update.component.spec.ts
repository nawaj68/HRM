import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobNewStatusCreateUpdateComponent } from './job-new-status-create-update.component';

describe('JobNewStatusCreateUpdateComponent', () => {
  let component: JobNewStatusCreateUpdateComponent;
  let fixture: ComponentFixture<JobNewStatusCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobNewStatusCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobNewStatusCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
