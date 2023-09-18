import { TestBed } from '@angular/core/testing';

import { DepartmentSetupService } from './department-setup.service';

describe('DepartmentSetupService', () => {
  let service: DepartmentSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepartmentSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
