import { TestBed } from '@angular/core/testing';

import { EducationtypeService } from './educationtype.service';

describe('EducationtypeService', () => {
  let service: EducationtypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducationtypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
