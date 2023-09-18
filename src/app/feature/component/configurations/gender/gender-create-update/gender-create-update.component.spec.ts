import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderCreateUpdateComponent } from './gender-create-update.component';

describe('GenderCreateUpdateComponent', () => {
  let component: GenderCreateUpdateComponent;
  let fixture: ComponentFixture<GenderCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
