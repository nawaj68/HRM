import { TestBed } from '@angular/core/testing';

import { CliamTypeService } from './cliam-type.service';

describe('CliamTypeService', () => {
  let service: CliamTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CliamTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
