import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritalStatusCreateUpdateComponent } from './marital-status-create-update.component';

describe('MaritalStatusCreateUpdateComponent', () => {
  let component: MaritalStatusCreateUpdateComponent;
  let fixture: ComponentFixture<MaritalStatusCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaritalStatusCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaritalStatusCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
