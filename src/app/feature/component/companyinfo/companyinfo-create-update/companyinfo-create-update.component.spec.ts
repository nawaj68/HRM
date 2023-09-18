import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinfoCreateUpdateComponent } from './companyinfo-create-update.component';

describe('CompanyinfoCreateUpdateComponent', () => {
  let component: CompanyinfoCreateUpdateComponent;
  let fixture: ComponentFixture<CompanyinfoCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinfoCreateUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyinfoCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
