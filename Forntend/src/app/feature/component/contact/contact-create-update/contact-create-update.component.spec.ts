import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCreateUpdateComponent } from './contact-create-update.component';

describe('ContactCreateUpdateComponent', () => {
  let component: ContactCreateUpdateComponent;
  let fixture: ComponentFixture<ContactCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
