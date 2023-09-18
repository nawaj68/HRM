import { TestBed } from '@angular/core/testing';

import { WarningTypeService } from './warning-type.service';

describe('WarningTypeService', () => {
  let service: WarningTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarningTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
