import { TestBed } from '@angular/core/testing';

import { HobbyTypeService } from './hobby-type.service';

describe('HobbyTypeService', () => {
  let service: HobbyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HobbyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
