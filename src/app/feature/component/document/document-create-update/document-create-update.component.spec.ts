import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateUpdateComponent } from './document-create-update.component';

describe('DocumentCreateUpdateComponent', () => {
  let component: DocumentCreateUpdateComponent;
  let fixture: ComponentFixture<DocumentCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
