import { TestBed } from '@angular/core/testing';

import { EducationgroupService } from './educationgroup.service';

describe('EducationgroupService', () => {
  let service: EducationgroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationgroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
