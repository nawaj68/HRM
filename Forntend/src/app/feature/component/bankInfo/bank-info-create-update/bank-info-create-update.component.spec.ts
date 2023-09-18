import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankInfoCreateUpdateComponent } from './bank-info-create-update.component';

describe('BankInfoCreateUpdateComponent', () => {
  let component: BankInfoCreateUpdateComponent;
  let fixture: ComponentFixture<BankInfoCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankInfoCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankInfoCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
