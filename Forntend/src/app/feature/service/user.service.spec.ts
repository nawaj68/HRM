/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserInformationService } from './user.service';

describe('Service: UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInformationService]
    });
  });

  it('should ...', inject([UserInformationService], (service: UserInformationService) => {
    expect(service).toBeTruthy();
  }));
});
