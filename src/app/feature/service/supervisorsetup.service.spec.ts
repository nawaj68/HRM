import { TestBed } from '@angular/core/testing';

import { SupervisorsetupService } from './supervisorsetup.service';

describe('SupervisorsetupService', () => {
  let service: SupervisorsetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupervisorsetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
