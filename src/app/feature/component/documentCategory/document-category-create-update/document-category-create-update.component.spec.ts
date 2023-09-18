import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCategoryCreateUpdateComponent } from './document-category-create-update.component';

describe('DocumentCategoryCreateUpdateComponent', () => {
  let component: DocumentCategoryCreateUpdateComponent;
  let fixture: ComponentFixture<DocumentCategoryCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCategoryCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCategoryCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
