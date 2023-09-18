import { inject, TestBed } from '@angular/core/testing';

import { DepartmentService } from './department.service';

describe('Service : Department', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    providers: [DepartmentService]
  });

  it('should ...', inject([DepartmentService], (service: DepartmentService) => {
    expect(service).toBeTruthy();
  }));
});
