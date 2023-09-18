import { TestBed } from '@angular/core/testing';

import { JobBaseStatusService } from './job-base-status.service';

describe('JobBaseStatusService', () => {
  let service: JobBaseStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobBaseStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
