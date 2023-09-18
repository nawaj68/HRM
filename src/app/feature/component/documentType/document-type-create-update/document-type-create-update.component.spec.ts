import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeCreateUpdateComponent } from './document-type-create-update.component';

describe('DocumentTypeCreateUpdateComponent', () => {
  let component: DocumentTypeCreateUpdateComponent;
  let fixture: ComponentFixture<DocumentTypeCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentTypeCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
