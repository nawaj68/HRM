import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCreateUpdateComponent } from './language-create-update.component';

describe('LanguageCreateUpdateComponent', () => {
  let component: LanguageCreateUpdateComponent;
  let fixture: ComponentFixture<LanguageCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
