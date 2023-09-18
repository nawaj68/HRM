import { TestBed } from '@angular/core/testing';

import { DistributeAssetService } from './distribute-asset.service';

describe('DistributeAssetService', () => {
  let service: DistributeAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistributeAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
