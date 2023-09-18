import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinfoListComponent } from './companyinfo-list.component';

describe('CompanyinfoListComponent', () => {
  let component: CompanyinfoListComponent;
  let fixture: ComponentFixture<CompanyinfoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinfoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyinfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
