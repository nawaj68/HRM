import { TestBed } from '@angular/core/testing';

import { BranchInfoService } from './branch-info.service';

describe('BranchInfoService', () => {
  let service: BranchInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
