import { TestBed } from '@angular/core/testing';

import { NewApprovalWorkflowService } from './new-approval-workflow.service';

describe('NewApprovalWorkflowService', () => {
  let service: NewApprovalWorkflowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewApprovalWorkflowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
