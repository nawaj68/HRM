import { TestBed } from '@angular/core/testing';

import { OpeningYearService } from './opening-year.service';

describe('OpeningYearService', () => {
  let service: OpeningYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
