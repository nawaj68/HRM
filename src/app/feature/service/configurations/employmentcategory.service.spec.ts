import { TestBed } from '@angular/core/testing';

import { EmploymentcategoryService } from './employmentcategory.service';

describe('EmploymentcategoryService', () => {
  let service: EmploymentcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploymentcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
