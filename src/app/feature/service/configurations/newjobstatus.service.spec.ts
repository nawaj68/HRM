import { TestBed } from '@angular/core/testing';

import { NewjobstatusService } from './newjobstatus.service';

describe('NewjobstatusService', () => {
  let service: NewjobstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewjobstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
