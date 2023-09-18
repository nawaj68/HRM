import { TestBed } from '@angular/core/testing';

import { AwardTypeService } from './award-type.service';

describe('AwardTypeService', () => {
  let service: AwardTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
