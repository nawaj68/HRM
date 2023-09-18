import { TestBed } from '@angular/core/testing';

import { FunctionaldesignationService } from './functionaldesignation.service';

describe('FunctionaldesignationService', () => {
  let service: FunctionaldesignationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionaldesignationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
