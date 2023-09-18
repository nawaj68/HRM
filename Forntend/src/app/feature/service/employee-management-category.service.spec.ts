import { TestBed } from '@angular/core/testing';

import { EmployeeManagementCategoryService } from './employee-management-category.service';

describe('EmployeeManagementCategoryService', () => {
  let service: EmployeeManagementCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeManagementCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
