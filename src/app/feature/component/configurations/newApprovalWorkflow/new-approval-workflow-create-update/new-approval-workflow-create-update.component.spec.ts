import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewApprovalWorkflowCreateUpdateComponent } from './new-approval-workflow-create-update.component';

describe('NewApprovalWorkflowCreateUpdateComponent', () => {
  let component: NewApprovalWorkflowCreateUpdateComponent;
  let fixture: ComponentFixture<NewApprovalWorkflowCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewApprovalWorkflowCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewApprovalWorkflowCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
