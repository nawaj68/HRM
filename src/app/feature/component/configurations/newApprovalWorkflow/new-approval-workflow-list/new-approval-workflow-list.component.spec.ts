import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApprovalWorkflowListComponent } from './new-approval-workflow-list.component';

describe('NewApprovalWorkflowListComponent', () => {
  let component: NewApprovalWorkflowListComponent;
  let fixture: ComponentFixture<NewApprovalWorkflowListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApprovalWorkflowListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApprovalWorkflowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
