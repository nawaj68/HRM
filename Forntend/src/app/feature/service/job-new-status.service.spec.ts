import { TestBed } from '@angular/core/testing';

import { JobNewStatusService } from './job-new-status.service';

describe('JobNewStatusService', () => {
  let service: JobNewStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobNewStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
