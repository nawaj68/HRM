import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportCreateUpdateComponent } from './passport-create-update.component';

describe('PassportCreateUpdateComponent', () => {
  let component: PassportCreateUpdateComponent;
  let fixture: ComponentFixture<PassportCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
