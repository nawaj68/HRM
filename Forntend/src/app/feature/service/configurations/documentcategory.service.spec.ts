import { TestBed } from '@angular/core/testing';

import { DocumentcategoryService } from './documentcategory.service';

describe('DocumentcategoryService', () => {
  let service: DocumentcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
