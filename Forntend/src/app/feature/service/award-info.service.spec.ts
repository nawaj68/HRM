import { TestBed } from '@angular/core/testing';

import { AwardInfoService } from './award-info.service';

describe('AwardInfoService', () => {
  let service: AwardInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
